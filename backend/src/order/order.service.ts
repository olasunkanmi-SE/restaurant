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
import { CreateOrderDTO } from './dto/create-order.dto';
import { IOrderService } from './interface/order-service.interface';
import { Order } from './order';
import { IOrderResponseDTO } from './order-response.dto';
import { OrderMapper } from './order.mapper';
import { OrderParser } from './order.parser';

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
    @Inject(TYPES.ICartItemRepository) private readonly cartItemRepository: ICartItemRepository,
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
      const order: Order = Order.create({ state, type, total, merchantId: merchantObjId, audit });
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

        const cartSelectedItems = cartItems.map((item) => item.selectedItems);
        const flattenedSelectedItems = cartSelectedItems.flat();
        flattenedSelectedItems.forEach((item) => {
          if (cartItemMap.has(this.orderRepository.objectIdToString(item.menuId))) {
            const cartItemId = cartItemMap.get(this.orderRepository.objectIdToString(item.menuId));
            item.cartItemId = this.orderRepository.stringToObjectId(cartItemId);
          }
        });

        const selectedItems = flattenedSelectedItems.map((item) => SelectedCartItem.create({ ...item, audit }));
        const selectedCartItemsDataModel = selectedItems.map((item) => this.selectedItemMapper.toPersistence(item));
        const insertedItems: Result<SelectedCartItem[]> = await this.selectedCartItemRepository.insertMany(
          selectedCartItemsDataModel,
        );
        let response: IOrderResponseDTO | undefined;
        if (insertedItems.isSuccess) {
          response = OrderParser.createOrderResponse(savedOrder);
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
      session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }

  async getOrders(): Promise<Result<Order[]>> {
    return await this.orderRepository.find({});
  }
}
