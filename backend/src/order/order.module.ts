import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TYPES } from 'src/application';
import { AuditMapper } from 'src/audit';
import { CartItemMapper } from 'src/cart/cart-item.mapper';
import { SelectedCartItemMapper } from 'src/cart/selectedItems/selected-cart-item.mapper';
import {
  ContextService,
  ItemDataModel,
  ItemSchema,
  MerchantDataModel,
  MerchantRepository,
  MerchantSchema,
} from 'src/infrastructure';
import { CartItemRepository } from 'src/infrastructure/data_access/repositories/cart-item.repository';
import { OrderRepository } from 'src/infrastructure/data_access/repositories/order.repository';
import { CartItemDataModel, CartItemSchema } from 'src/infrastructure/data_access/repositories/schemas/cartItem.schema';
import { OrderDataModel, OrderSchema } from 'src/infrastructure/data_access/repositories/schemas/order.schema';
import {
  SelectedCartItemDataModel,
  SelectedCartItemSchema,
} from 'src/infrastructure/data_access/repositories/schemas/selected-cart-item.schema';
import { SelectedCartItemRepository } from 'src/infrastructure/data_access/repositories/selected-cart-item.repository';
import { MerchantMapper, MerchantService } from 'src/merchant';
import { ValidateUser } from 'src/utils';
import { OrderMapper } from './order.mapper';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ContextMiddleWare } from 'src/infrastructure/middlewares';
import { OrderStatusRepository } from 'src/infrastructure/data_access/repositories/order-status.repository';
import {
  OrderStatusModel,
  OrderStatusSchema,
} from 'src/infrastructure/data_access/repositories/schemas/order-status.schema';
import { OrderStatusMapper } from 'src/order_statuses/order_status.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderDataModel.name, schema: OrderSchema },
      { name: MerchantDataModel.name, schema: MerchantSchema },
      { name: ItemDataModel.name, schema: ItemSchema },
      { name: CartItemDataModel.name, schema: CartItemSchema },
      { name: SelectedCartItemDataModel.name, schema: SelectedCartItemSchema },
      { name: OrderStatusModel.name, schema: OrderStatusSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [
    { provide: TYPES.IOrderService, useClass: OrderService },
    { provide: TYPES.ICartItemRepository, useClass: CartItemRepository },
    { provide: TYPES.IOrderRepository, useClass: OrderRepository },
    { provide: TYPES.IMerchantService, useClass: MerchantService },
    { provide: TYPES.IContextService, useClass: ContextService },
    { provide: TYPES.IValidateUser, useClass: ValidateUser },
    { provide: TYPES.IOrderStatusRepository, useClass: OrderStatusRepository },
    MerchantRepository,
    CartItemRepository,
    SelectedCartItemRepository,
    OrderMapper,
    SelectedCartItemMapper,
    CartItemMapper,
    JwtService,
    MerchantMapper,
    AuditMapper,
    OrderStatusMapper,
  ],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleWare).exclude().forRoutes(OrderController);
  }
}
