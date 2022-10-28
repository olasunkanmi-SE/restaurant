import { BaseDocument } from '../../../../infrastructure/database';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IMerchantData } from '../interfaces/merchant-model.interface';

export type MerchantDocument = MerchantData & Document;

@Schema({ versionKey: false })
export class MerchantData extends BaseDocument implements IMerchantData {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  organisationName: string;

  @Prop({ type: String, required: true })
  organisationAddress: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: String, required: true })
  role: string;

  @Prop({ type: Boolean, required: true, default: false })
  isActive: boolean;

  @Prop({ type: String })
  status: string;
}

export const MerchantSchema = SchemaFactory.createForClass(MerchantData);
