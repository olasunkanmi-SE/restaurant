import { BaseDocument } from 'src/infrastructure/database';
import { IOrderStatusModel } from '../models/order-status-model.interface';
import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { OrderDataModel } from './order.schema';
import { Type } from 'class-transformer';

export class OrderStatusModel extends BaseDocument implements IOrderStatusModel {
  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: OrderDataModel }] })
  @Type(() => OrderDataModel)
  orders?: OrderDataModel[];
}
