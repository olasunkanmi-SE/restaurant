import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseDocument } from '../../../../infrastructure/database';
import { IOrderStatusModel } from '../models/order-status-model.interface';

export type OrderStatusDocument = OrderStatusModel & Document;
@Schema({ versionKey: 'false' })
export class OrderStatusModel extends BaseDocument implements IOrderStatusModel {
  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, isRequired: false })
  description?: string;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatusModel);
