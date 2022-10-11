import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../../database/mongoDB/base-document';
import { Document } from 'mongoose';
import { Location, LocationSchema } from './location.schema';
import { Type } from 'class-transformer';

export type RestaurantDocument = Restaurant & Document;

@Schema({ versionKey: false })
export class Restaurant extends BaseDocument {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: Boolean, required: true })
  isActive: boolean;

  @Prop({ type: String })
  webUrl: string;

  @Prop({ type: String })
  logoUrl: string;

  @Prop({ type: LocationSchema })
  @Type(() => Location)
  location: Location;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
