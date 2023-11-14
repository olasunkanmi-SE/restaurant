import { BaseDocument } from 'src/infrastructure/database';
import { IOrderStatusModel } from '../models/order-status-model.interface';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { OrderDataModel } from './order.schema';
import { Type } from 'class-transformer';

export type OrderStatusDocument = OrderStatusModel & Document;
export class OrderStatusModel extends BaseDocument implements IOrderStatusModel {
  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, isRequired: false })
  description?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: OrderDataModel }] })
  @Type(() => OrderDataModel)
  orders?: OrderDataModel[];
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatusModel);
