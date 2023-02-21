import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { BaseDocument } from '../../../../infrastructure/database';
import { IOrderManagerDataModel } from '../models/order-manager-model.interface';
import { RoleEnum } from './../../../../order_manager/order.manager.entity';
import { MerchantDataModel } from './merchant.schema';

export type OrderManagerDocument = OrderManagerDataModel & Document;

@Schema({ versionKey: false })
export class OrderManagerDataModel extends BaseDocument implements IOrderManagerDataModel {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String })
  readonly phoneNumber: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MerchantDataModel.name })
  @Type(() => MerchantDataModel)
  merchant: MerchantDataModel;

  @Prop({ type: String, required: true, default: RoleEnum.ADMIN })
  readonly role: number;

  @Prop({ type: String, required: true })
  readonly password: string;
}

export const OrderManagerSchema = SchemaFactory.createForClass(OrderManagerDataModel);
