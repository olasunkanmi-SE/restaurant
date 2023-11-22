import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document, Types } from 'mongoose';
import { BaseDocument } from 'src/infrastructure/database';
import { IOrderProcessingQueueModel } from '../models/order-processing-queue.model';
import { OrderStatusModel } from './order-status.schema';
import { OrderDataModel } from './order.schema';

export type OrderProcessingQueueDocument = OrderProcessingQueueModel & Document;

@Schema({ versionKey: 'false' })
export class OrderProcessingQueueModel extends BaseDocument implements IOrderProcessingQueueModel {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Type(() => OrderStatusModel)
  orderStatusId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Type(() => OrderDataModel)
  orderId: Types.ObjectId;
}

export const OrderProcessingQueueSchema = SchemaFactory.createForClass(OrderProcessingQueueModel);
