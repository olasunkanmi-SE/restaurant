import { CartItemMapper } from './../cart/cart-item.mapper';
import { CartItemDataModel } from 'src/infrastructure/data_access/repositories/schemas/cartItem.schema';
import { SelectedCartItemMapper } from './../cart/selectedItems/selected-cart-item.mapper';
import { ConvertId } from './../utils/mongoose-id-conversion';
import { HttpStatus, Inject } from '@nestjs/common';
import { TYPES } from 'src/application';
import { IOrderRepository } from 'src/infrastructure/data_access/repositories/interfaces/order-repository.interface';
import { CreateOrderDTO } from './dto/create-order.dto';
import { IMerchantService, Merchant } from 'src/merchant';
import { Context, IContextService, MerchantRepository } from 'src/infrastructure';
import { Audit, Result } from 'src/domain';
import { throwApplicationError } from 'src/infrastructure/utilities/exception-instance';
import { Order } from './order';
import { OrderDataModel } from 'src/infrastructure/data_access/repositories/schemas/order.schema';
import { OrderMapper } from './order.mapper';
import { CartItem } from 'src/cart/cart-item';
import { CartItemRepository } from 'src/infrastructure/data_access/repositories/cart-item.repository';
import { Types } from 'mongoose';
import { SelectedCartItem } from 'src/cart/selectedItems/selectedCartItem';
import { SelectedCartItemRepository } from 'src/infrastructure/data_access/repositories/selected-cart-item.repository';
import { OrderParser } from './order.parser';
import { IOrderResponseDTO } from './order-response.dto';
import { IOrderService } from './interface/order-service.interface';

export class OrderService implements IOrderService {
  private context: Context;
  constructor(
    @Inject(TYPES.IOrderRepository) private readonly orderRepository: IOrderRepository,
    @Inject(TYPES.IMerchantService) private readonly merchantService: IMerchantService,
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
    private readonly merchantRepository: MerchantRepository,
    private readonly cartItemRepository: CartItemRepository,
    private readonly selectedCartItemRepository: SelectedCartItemRepository,
    private readonly orderMapper: OrderMapper,
    private readonly selectedItemMapper: SelectedCartItemMapper,
    private readonly cartItemMapper: CartItemMapper,
  ) {
    this.context = this.contextService.getContext();
  }

  async createOrder(orderSummary: CreateOrderDTO): Promise<Result<IOrderResponseDTO>> {
    await this.merchantService.validateContext();
    const { state, type, merchantId, total, cartItems } = orderSummary;
    const validateMerchant: Result<Merchant> = await this.merchantRepository.findOne({ _id: merchantId });
    if (!validateMerchant.isSuccess) {
      throwApplicationError(HttpStatus.NOT_FOUND, `Merchant does not exist`);
    }
    const session = await this.orderRepository.startSession();
    session.startTransaction();
    try {
      const audit: Audit = Audit.createInsertContext(this.context);
      const merchantObjId = ConvertId.convertStringToObjectId(merchantId);
      const order: Order = Order.create({ state, type, total, merchantId: merchantObjId, audit });
      const orderModel: OrderDataModel = this.orderMapper.toPersistence(order);
      const orderToSave: Result<Order> = await this.orderRepository.createOrder(orderModel);
      if (!orderToSave.isSuccess) {
        throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, 'Error while creating order');
      }
      const savedOrder = orderToSave.getValue();
      const orderId = savedOrder.id;
      if (cartItems) {
        const items = cartItems.map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { selectedItems, ...otherItemProperties } = item;
          return CartItem.create({ ...otherItemProperties, orderId, audit });
        });
        const cartItemDataModels: CartItemDataModel[] = items.map((item) => this.cartItemMapper.toPersistence(item));
        const savedCartItems: Result<CartItem[]> = await this.cartItemRepository.insertMany(cartItemDataModels);
        if (!savedCartItems.isSuccess) {
          throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, 'Error while creating order');
        }
        const savedItems = savedCartItems.getValue();

        const cartItemMap = new Map<Types.ObjectId, Types.ObjectId>();
        savedItems.forEach((item) => cartItemMap.set(item.menuId, item.id));

        const cartSelectedItems = cartItems.map((item) => item.selectedItems);
        const flattenedSelectedItems = cartSelectedItems.flat();
        flattenedSelectedItems.forEach((item) => {
          if (cartItemMap.has(item.menuId)) {
            item.cartItemId = cartItemMap.get(item.menuId);
          }
        });
        const selectedItems = flattenedSelectedItems.map((item) => SelectedCartItem.create({ ...item, audit }));
        const selectedCartItemsDataModel = selectedItems.map((item) => this.selectedItemMapper.toPersistence(item));
        const savedSelectedCartItems: Result<SelectedCartItem[]> = await this.selectedCartItemRepository.insertMany(
          selectedCartItemsDataModel,
        );
        if (!savedSelectedCartItems.isSuccess) {
          throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, 'Error while creating order');
        }
        await session.commitTransaction();
        const response = OrderParser.createOrderResponse(savedOrder);
        return Result.ok(response);
      }
    } catch (error) {
      session.abortTransaction();
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, JSON.stringify(error));
    }
  }
}
