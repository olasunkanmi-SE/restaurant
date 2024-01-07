import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document, Types } from 'mongoose';
import { BaseDocument } from '../../../../infrastructure/database';
import { IOrderDataModel } from '../models/order-model.interface';
import { dinningType } from './../../../../order/order-entity.interface';
import { CartItemDataModel } from './cartItem.schema';
import { SingleClientDataModel } from './singleclient.schema';
import { OrderManagerDataModel } from './order-manger.schema';
import { OrderStatusModel } from './order-status.schema';

export type OrderDocument = OrderDataModel & Document;

@Schema({ versionKey: 'false' })
export class OrderDataModel extends BaseDocument implements IOrderDataModel {
  @Prop({ type: String, required: true })
  type: dinningType;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Type(() => SingleClientDataModel)
  singleclientId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  @Type(() => OrderManagerDataModel)
  orderManagerId?: Types.ObjectId;

  @Prop({ type: Number, required: false })
  discount?: number;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItemDataModel' }] })
  @Type(() => CartItemDataModel)
  cartItems?: CartItemDataModel[];

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Type(() => OrderStatusModel)
  orderStatusId: Types.ObjectId;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: OrderStatusModel.name } })
  @Type(() => OrderStatusModel)
  state?: OrderStatusModel;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDataModel);
