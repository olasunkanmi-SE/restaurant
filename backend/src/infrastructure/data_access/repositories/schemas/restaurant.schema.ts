import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../../database/mongoDB/base-document';
import { Document } from 'mongoose';
import { LocationData, LocationSchema } from './location.schema';
import { Type } from 'class-transformer';

export type RestaurantDocument = RestaurantData & Document;

@Schema({ versionKey: false })
export class RestaurantData extends BaseDocument {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: Boolean, required: true, default: false })
  isActive: boolean;

  @Prop({ type: String })
  webUrl: string;

  @Prop({ type: String })
  logoUrl: string;
  
  @Prop({ type: String })
  timeZone: string;

  @Prop({ type: LocationSchema })
  @Type(() => LocationData)
  location: LocationData;
}

export const RestaurantSchema = SchemaFactory.createForClass(RestaurantData);
