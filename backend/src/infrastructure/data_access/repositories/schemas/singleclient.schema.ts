import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseDocument } from '../../../database';
import { ISingleClientData } from '../models/singleclient-model.interface';
import { SingleClientStatus } from '../../../../application/constants/constants';

export type SingleClientDocument = SingleClientDataModel & Document;

@Schema({ versionKey: false })
export class SingleClientDataModel extends BaseDocument implements ISingleClientData {
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

  @Prop({ type: String, default: SingleClientStatus.onBoarding })
  status: string;

  @Prop({ type: String })
  refreshTokenHash: string;
}

export const SingleClientSchema = SchemaFactory.createForClass(SingleClientDataModel);
