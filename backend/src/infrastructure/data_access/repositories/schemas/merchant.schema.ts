import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseDocument } from '../../../../infrastructure/database';
import { IMerchantData } from '../interfaces/merchant-model.interface';
import { MerchantStatus } from './../../../../application/constants/constants';

export type MerchantDocument = MerchantData & Document;

@Schema({ versionKey: false })
export class MerchantData extends BaseDocument implements IMerchantData {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String })
  organisationName: string;

  @Prop({ type: String })
  organisationAddress: string;

  @Prop({ type: String })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: String, default: 'admin' })
  role: string;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: String, default: MerchantStatus.onBoarding })
  status: string;

  @Prop({ type: String })
  refreshTokenHash: string;
}

export const MerchantSchema = SchemaFactory.createForClass(MerchantData);
