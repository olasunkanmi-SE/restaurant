import { ILocation } from './../location.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from './../../../database/mongoDB/base-document';
import { Document } from 'mongoose';

export type LocationDocument = LocationDataDocument & Document;

@Schema({ versionKey: false })
export class LocationDataDocument extends BaseDocument implements ILocation {
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

export const LocationSchema =
  SchemaFactory.createForClass(LocationDataDocument);
