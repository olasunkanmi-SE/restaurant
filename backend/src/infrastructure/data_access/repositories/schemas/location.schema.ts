import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseDocument } from './../../../database/mongoDB/base-document';
import { ILocationData } from '../models/location-model.interface';

export type LocationDocument = LocationData & Document;

@Schema({ versionKey: false })
export class LocationData extends BaseDocument implements ILocationData {
  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String })
  address2: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  postCode: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: String })
  latitude?: string;

  @Prop({ type: String })
  longitude?: string;
}

export const LocationSchema = SchemaFactory.createForClass(LocationData);
