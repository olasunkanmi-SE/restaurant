import { ILocation } from './../location.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from './../../../database/mongoDB/base-document';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ versionKey: false })
export class Location extends BaseDocument implements ILocation {
  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String })
  address_2: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  postal_code: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: Number })
  latitude?: number;

  @Prop({ type: Number })
  longitude?: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
