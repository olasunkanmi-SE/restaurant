import { HttpStatus, Inject } from '@nestjs/common';
import { Types } from 'mongoose';
import { TYPES } from '../application';
import { CartItem } from '../cart/cart-item';
import { SelectedCartItem } from '../cart/selectedItems/selectedCartItem';
import { Audit, Result } from '../domain';
import { Context, IContextService, SingleClientRepository } from '../infrastructure';
import { ICartItemRepository } from '../infrastructure/data_access/repositories/interfaces/cart-item-repository.interface';
import { IOrderRepository } from '../infrastructure/data_access/repositories/interfaces/order-repository.interface';
import { IOrderStatusRespository } from '../infrastructure/data_access/repositories/interfaces/order-status.repository';
import { CartItemDataModel } from '../infrastructure/data_access/repositories/schemas/cartItem.schema';
import { OrderDataModel } from '../infrastructure/data_access/repositories/schemas/order.schema';
import { SelectedCartItemRepository } from '../infrastructure/data_access/repositories/selected-cart-item.repository';
import { throwApplicationError } from '../infrastructure/utilities/exception-instance';
import { ISingleClientService, SingleClient } from '../singleclient';
import { IOrderNoteService } from '../order_notes/interface/order-note-service.interface';
import { OrderNote } from '../order_notes/order_note';
import { CartItemMapper } from './../cart/cart-item.mapper';
import { SelectedCartItemMapper } from './../cart/selectedItems/selected-cart-item.mapper';
import { CreateCartItemsDTO, CreateOrderDTO } from './dto/create-order.dto';
import { IOrderService } from './interface/order-service.interface';
import { Order } from './order';
import { IOrderResponseDTO } from './order-response.dto';
import { OrderMapper } from './order.mapper';
import { OrderParser } from './order.parser';
import { IOrderProcessingQueueService } from '../order_processing_queue/interface/order-processing-queue-service.interface';

export class OrderService implements IOrderService {
  private context: Context;
  constructor(
    @Inject(TYPES.IOrderRepository) private readonly orderRepository: IOrderRepository,
    @Inject(TYPES.ISingleClientService) private readonly singleclientService: ISingleClientService,
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
    private readonly singleclientRepository: SingleClientRepository,
    private readonly selectedCartItemRepository: SelectedCartItemRepository,
    private readonly orderMapper: OrderMapper,
    private readonly selectedItemMapper: SelectedCartItemMapper,
    private readonly cartItemMapper: CartItemMapper,
    @Inject(TYPES.ICartItemRepository) private readonly cartItemRepository: ICartItemRepository,
    @Inject(TYPES.IOrderStatusRepository) private readonly orderStatusRespository: IOrderStatusRespository,
    @Inject(TYPES.IOrderNoteService) private readonly orderNoteService: IOrderNoteService,
    @Inject(TYPES.IOrderProcessingQueueService)
    private readonly OrderProcessingQueueService: IOrderProcessingQueueService,
  ) {
    this.context = this.contextService.getContext();
  }

  async createOrder(orderSummary: CreateOrderDTO): Promise<Result<IOrderResponseDTO>> {
    await this.singleclientService.validateContext();
    const { state, type, singleClientId, total, cartItems, summary } = orderSummary;
    const orderDuplicate = await this.orderRepository.getDuplicateOrder(type, singleClientId, cartItems);
    if (orderDuplicate) {
      throwApplicationError(HttpStatus.NOT_FOUND, 'Duplicate order detected. Please confirm.');
    }
    const validateSingleClient: Result<SingleClient> = await this.singleclientRepository.findOne({
      _id: singleClientId,
    });
    if (!validateSingleClient.isSuccess) {
      throwApplicationError(HttpStatus.NOT_FOUND, `SingleClient does not exist`);
    }
    const session = await this.orderRepository.startSession();
    try {
      await session.startTransaction();
      const audit: Audit = Audit.createInsertContext(this.context);
      const singleclientObjId = this.orderRepository.stringToObjectId(singleClientId);
      const getOrderStatus = await this.orderStatusRespository.findOne({ code: state.toUpperCase() });
      if (!getOrderStatus) {
        throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Order status not found`);
      }
      const orderStatus = getOrderStatus.getValue();
      const order: Order = Order.create({
        orderStatusId: orderStatus.id,
        type,
        total,
        singleclientId: singleclientObjId,
        summary,
        audit,
      });
      const orderModel: OrderDataModel = this.orderMapper.toPersistence(order);
      const orderToSave: Result<Order> = await this.orderRepository.createOrder(orderModel);
      const savedOrder = orderToSave.getValue();
      const orderId = savedOrder.id;
      if (cartItems?.length) {
        const items = cartItems.map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { selectedItems, ...otherItemProperties } = item;
          return CartItem.create({ ...otherItemProperties, orderId, audit });
        });
        const cartItemDataModels: CartItemDataModel[] = items.map((item) => this.cartItemMapper.toPersistence(item));
        const savedCartItems: Result<CartItem[]> = await this.cartItemRepository.insertMany(cartItemDataModels);
        const savedItems = savedCartItems.getValue();
        savedOrder.cartItems = savedItems;
        savedOrder.state = orderStatus;
        const orderWithCartItems = await this.orderRepository.upsert(
          { _id: orderId },
          this.orderMapper.toPersistence(savedOrder),
          { session },
        );
        if (!orderWithCartItems.isSuccess) {
          throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Error while creating order`);
        }

        const cartItemMap = savedItems.reduce((map, item) => {
          map.set(this.orderRepository.objectIdToString(item.menuId), this.orderRepository.objectIdToString(item.id));
          return map;
        }, new Map<string, string>());

        const flattenedSelectedItems = cartItems.flatMap((item) => item.selectedItems);
        flattenedSelectedItems.forEach((item) => {
          if (cartItemMap.has(item.menuId)) {
            const cartItemId = cartItemMap.get(item.menuId);
            item.cartItemId = cartItemId;
          }
        });
        const selectedItems = flattenedSelectedItems.map((item) =>
          SelectedCartItem.create({
            ...item,
            cartItemId: this.orderRepository.stringToObjectId(item.cartItemId),
            itemId: this.orderRepository.stringToObjectId(item.itemId),
            menuId: this.orderRepository.stringToObjectId(item.menuId),
            audit,
          }),
        );
        const selectedCartItemsDataModel = selectedItems.map((item) => this.selectedItemMapper.toPersistence(item));
        const insertedItems: Result<Types.ObjectId[]> = await this.selectedCartItemRepository.insertManyWithSession(
          selectedCartItemsDataModel,
        );
        if (!insertedItems.isSuccess) {
          throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Could not create an order`);
        }
        const notes = await this.createOrderNotes(cartItems, orderId);
        const notesToSave: OrderNote[] = notes || [];
        const response: IOrderResponseDTO | undefined = OrderParser.createOrderResponse(savedOrder, notesToSave);
        const savedSelectedItemIds = insertedItems.getValue();
        let savedSelectedItems: SelectedCartItem[];
        if (savedSelectedItemIds.length) {
          const result = await this.selectedCartItemRepository.find({ _id: { $in: savedSelectedItemIds } });
          if (result.isSuccess) {
            savedSelectedItems = result.getValue();
          }
        }
        const savedItemsMap = savedSelectedItems.reduce((map, item) => {
          const cartItemIdToString = this.cartItemRepository.objectIdToString(item.cartItemId);
          !map.has(cartItemIdToString) ? map.set(cartItemIdToString, [item]) : map.get(cartItemIdToString).push(item);
          return map;
        }, new Map<string, SelectedCartItem[]>());
        savedItems.forEach((item) => {
          if (savedItemsMap.has(this.cartItemRepository.objectIdToString(item.id))) {
            item.selectedItems = savedItemsMap.get(this.cartItemRepository.objectIdToString(item.id));
          }
        });
        await this.cartItemRepository.updateCartItemSelectedItems(savedItems);
        await this.createOrderStatusQueue(orderStatus.id, orderId);
        await session.commitTransaction();
        return Result.ok(response);
      }
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      return Result.fail('An error occurred during order creation.', HttpStatus.BAD_REQUEST);
    } finally {
      await session.endSession();
    }
  }

  async getOrdersBasic(): Promise<IOrderResponseDTO[]> {
    const result = await this.orderRepository.getOrders();
    const response = OrderParser.createOrdersResponse(result.getValue());
    return response;
  }

  async createOrderNotes(cartItems: CreateCartItemsDTO[], orderId: Types.ObjectId): Promise<OrderNote[]> {
    const orderNotes: { menuId: Types.ObjectId; note: string; orderId: Types.ObjectId }[] = [];
    cartItems.forEach(({ menuId, note }: CreateCartItemsDTO) => {
      if (note?.length) {
        orderNotes.push({
          menuId,
          note: note,
          orderId: orderId,
        });
      }
    });

    if (orderNotes.length) {
      const notes = await this.orderNoteService.createNotes(orderNotes);
      return notes.getValue();
    }
  }

  async createOrderStatusQueue(orderStatusId: Types.ObjectId, orderId: Types.ObjectId) {
    return this.OrderProcessingQueueService.createQueue({ orderStatusId, orderId });
  }
}
