import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Types } from 'mongoose';
import { BaseDocument } from 'src/infrastructure/database';
import { IOrderDataModel } from '../models/order-model.interface';
import { currentStatus, dinningType } from './../../../../order/order-entity.interface';
import { MerchantDataModel } from './merchant.schema';
import { OrderManagerDataModel } from './order-manger.schema';

export type OrderDocument = OrderDataModel & Document;

@Schema({ versionKey: 'false' })
export class OrderDataModel extends BaseDocument implements IOrderDataModel {
  @Prop({ type: String, required: true, default: 'CREATED' })
  state: currentStatus;

  @Prop({ type: String, required: true })
  type: dinningType;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Type(() => MerchantDataModel)
  merchantId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  @Type(() => OrderManagerDataModel)
  orderManagerId?: Types.ObjectId;

  @Prop({ type: Number, required: false })
  discount?: number;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDataModel);
