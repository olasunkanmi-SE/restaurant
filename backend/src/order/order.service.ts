import { OrderNoteMapper } from 'src/order_notes/order_note.mapper';
import { HttpStatus, Inject } from '@nestjs/common';
import { TYPES } from 'src/application';
import { CartItem } from 'src/cart/cart-item';
import { SelectedCartItem } from 'src/cart/selectedItems/selectedCartItem';
import { Audit, Result } from 'src/domain';
import { Context, IContextService, MerchantRepository } from 'src/infrastructure';
import { ICartItemRepository } from 'src/infrastructure/data_access/repositories/interfaces/cart-item-repository.interface';
import { IOrderRepository } from 'src/infrastructure/data_access/repositories/interfaces/order-repository.interface';
import { CartItemDataModel } from 'src/infrastructure/data_access/repositories/schemas/cartItem.schema';
import { OrderDataModel } from 'src/infrastructure/data_access/repositories/schemas/order.schema';
import { SelectedCartItemRepository } from 'src/infrastructure/data_access/repositories/selected-cart-item.repository';
import { throwApplicationError } from 'src/infrastructure/utilities/exception-instance';
import { IMerchantService, Merchant } from 'src/merchant';
import { CartItemMapper } from './../cart/cart-item.mapper';
import { SelectedCartItemMapper } from './../cart/selectedItems/selected-cart-item.mapper';
import { CreateCartItemsDTO, CreateOrderDTO } from './dto/create-order.dto';
import { IOrderService } from './interface/order-service.interface';
import { Order } from './order';
import { IOrderResponseDTO } from './order-response.dto';
import { OrderMapper } from './order.mapper';
import { OrderParser } from './order.parser';
import { IOrderStatusRespository } from 'src/infrastructure/data_access/repositories/interfaces/order-status.repository';
import { OrderNote } from 'src/order_notes/order_note';
import { IOrderNoteRespository } from 'src/infrastructure/data_access/repositories/interfaces/order-note.repository';
import { OrderNoteParser } from 'src/order_notes/order_note_parser';
import { IOrderNoteResponseDTO } from 'src/order_notes/dto/order-note-response';
import { Types } from 'mongoose';

export class OrderService implements IOrderService {
  private context: Context;
  constructor(
    @Inject(TYPES.IOrderRepository) private readonly orderRepository: IOrderRepository,
    @Inject(TYPES.IMerchantService) private readonly merchantService: IMerchantService,
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
    private readonly merchantRepository: MerchantRepository,
    private readonly selectedCartItemRepository: SelectedCartItemRepository,
    private readonly orderMapper: OrderMapper,
    private readonly selectedItemMapper: SelectedCartItemMapper,
    private readonly cartItemMapper: CartItemMapper,
    private readonly orderNoteMapper: OrderNoteMapper,
    @Inject(TYPES.ICartItemRepository) private readonly cartItemRepository: ICartItemRepository,
    @Inject(TYPES.IOrderStatusRepository) private readonly orderStatusRespository: IOrderStatusRespository,
    @Inject(TYPES.IOrderNoteRepository) private readonly orderNoteRepository: IOrderNoteRespository,
  ) {
    this.context = this.contextService.getContext();
  }

  async createOrder(orderSummary: CreateOrderDTO): Promise<Result<IOrderResponseDTO>> {
    await this.merchantService.validateContext();
    const { state, type, merchantId, total, cartItems } = orderSummary;
    const orderDuplicate = await this.orderRepository.getDuplicateOrder(type, merchantId, cartItems);
    if (orderDuplicate) {
      throwApplicationError(HttpStatus.NOT_FOUND, 'Duplicate order detected. Please confirm.');
    }
    const validateMerchant: Result<Merchant> = await this.merchantRepository.findOne({ _id: merchantId });
    if (!validateMerchant.isSuccess) {
      throwApplicationError(HttpStatus.NOT_FOUND, `Merchant does not exist`);
    }
    const session = await this.orderRepository.startSession();
    session.startTransaction();
    try {
      const audit: Audit = Audit.createInsertContext(this.context);
      const merchantObjId = this.orderRepository.stringToObjectId(merchantId);
      const getOrderStatus = await this.orderStatusRespository.findOne({ code: state.toUpperCase() });
      if (!getOrderStatus) {
        throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Order status not found`);
      }
      const orderStatus = getOrderStatus.getValue();
      const order: Order = Order.create({ state: orderStatus, type, total, merchantId: merchantObjId, audit });
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
        const orderWithCartItems = await this.orderRepository.upsert(
          { _id: orderId },
          this.orderMapper.toPersistence(savedOrder),
        );
        if (orderWithCartItems.isSuccess === false) {
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
        const insertedItems: Result<SelectedCartItem[]> = await this.selectedCartItemRepository.insertMany(
          selectedCartItemsDataModel,
        );
        let response: IOrderResponseDTO | undefined;
        const notes = await this.createOrderNotes(cartItems, orderId, audit);
        if (insertedItems.isSuccess) {
          response = OrderParser.createOrderResponse(savedOrder, notes);
        } else {
          throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, `Could not create an order`);
        }
        const savedSelectedItems = insertedItems.getValue();
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
        await session.commitTransaction();
        return Result.ok(response);
      }
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }

  async getOrders(): Promise<Result<Order[]>> {
    return await this.orderRepository.find({});
  }

  async createOrderNotes(
    cartItems: CreateCartItemsDTO[],
    orderId: Types.ObjectId,
    audit: Audit,
  ): Promise<IOrderNoteResponseDTO[]> {
    try {
      const orderNotes = cartItems.map((item) => {
        return {
          menuId: item.menuId,
          note: item.note ? item.note : '',
          orderId: orderId,
        };
      });
      const createOrderNotes: OrderNote[] = orderNotes.map((note) => OrderNote.create({ ...note, audit }));
      const notesToBeSaved = createOrderNotes.map((note) => this.orderNoteMapper.toPersistence(note));
      const result: Result<OrderNote[]> = await this.orderNoteRepository.insertMany(notesToBeSaved);
      let response: IOrderNoteResponseDTO[] | undefined;
      if (result.isSuccess) {
        response = OrderNoteParser.createOrderStatusResponses(result.getValue());
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
