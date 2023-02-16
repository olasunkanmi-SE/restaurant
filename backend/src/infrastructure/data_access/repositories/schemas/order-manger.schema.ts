import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { BaseDocument } from 'src/infrastructure/database';
import { Merchant } from 'src/merchant';
import { IOrderManagerDataModel } from '../interfaces/order-manager-model.interface';
import { Role } from './../../../../order_manager/order.manager.entity';
import { MerchantDataModel } from './merchant.schema';

export type OrderManagerDocument = OrderManagerDataModel & Document & BaseDocument;

@Schema({ versionKey: false })
export class OrderManagerDataModel implements IOrderManagerDataModel {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String })
  readonly phoneNumber: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MerchantDataModel.name })
  @Type(() => MerchantDataModel)
  merchant: Merchant;

  @Prop({ type: String, required: true })
  readonly role: Role;
}

export const OrderManagerSchema = SchemaFactory.createForClass(OrderManagerDataModel);
