import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TYPES } from '../application';
import { AuditMapper } from '../audit';
import { CartItemMapper } from '../cart/cart-item.mapper';
import { SelectedCartItemMapper } from '../cart/selectedItems/selected-cart-item.mapper';
import {
  ContextService,
  ItemDataModel,
  ItemSchema,
  MerchantDataModel,
  MerchantRepository,
  MerchantSchema,
} from '../infrastructure';
import { CartItemRepository } from '../infrastructure/data_access/repositories/cart-item.repository';
import { OrderRepository } from '../infrastructure/data_access/repositories/order.repository';
import { CartItemDataModel, CartItemSchema } from '../infrastructure/data_access/repositories/schemas/cartItem.schema';
import { OrderDataModel, OrderSchema } from '../infrastructure/data_access/repositories/schemas/order.schema';
import {
  SelectedCartItemDataModel,
  SelectedCartItemSchema,
} from '../infrastructure/data_access/repositories/schemas/selected-cart-item.schema';
import { SelectedCartItemRepository } from '../infrastructure/data_access/repositories/selected-cart-item.repository';
import { MerchantMapper, MerchantService } from '../merchant';
import { ValidateUser } from '../utils';
import { OrderMapper } from './order.mapper';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ContextMiddleWare } from '../infrastructure/middlewares';
import { OrderStatusRepository } from '../infrastructure/data_access/repositories/order-status.repository';
import {
  OrderStatusModel,
  OrderStatusSchema,
} from '../infrastructure/data_access/repositories/schemas/order-status.schema';
import { OrderStatusMapper } from '../order_statuses/order_status.mapper';
import { OrderNoteMapper } from '../order_notes/order_note.mapper';
import { OrderNoteRepository } from '../infrastructure/data_access/repositories/order-note.repository';
import { OrderNoteModel, OrderNoteSchema } from '../infrastructure/data_access/repositories/schemas/order-note.schema';
import { OrderNoteService } from '../order_notes/order_note.service';
import { OrderProcessingQueueService } from '../order_processing_queue/order_processing_queue.service';
import {
  OrderProcessingQueueModel,
  OrderProcessingQueueSchema,
} from '../infrastructure/data_access/repositories/schemas/order-processing-queue.schema';
import { OrderProcessingQueueRepository } from '../infrastructure/data_access/repositories/order-processing-queue.repository';
import { OrderProcessingQueueMapper } from '../order_processing_queue/order_processing_queue.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderDataModel.name, schema: OrderSchema },
      { name: MerchantDataModel.name, schema: MerchantSchema },
      { name: ItemDataModel.name, schema: ItemSchema },
      { name: CartItemDataModel.name, schema: CartItemSchema },
      { name: SelectedCartItemDataModel.name, schema: SelectedCartItemSchema },
      { name: OrderStatusModel.name, schema: OrderStatusSchema },
      { name: OrderNoteModel.name, schema: OrderNoteSchema },
      { name: OrderProcessingQueueModel.name, schema: OrderProcessingQueueSchema },
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
    { provide: TYPES.IOrderNoteRepository, useClass: OrderNoteRepository },
    { provide: TYPES.IOrderNoteService, useClass: OrderNoteService },
    { provide: TYPES.IOrderProcessingQueueService, useClass: OrderProcessingQueueService },
    { provide: TYPES.IOrderProcessingQueueRepository, useClass: OrderProcessingQueueRepository },
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
    OrderNoteMapper,
    OrderProcessingQueueMapper,
  ],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleWare).exclude().forRoutes(OrderController);
  }
}
