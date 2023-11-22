import { BaseDocument } from 'src/infrastructure/database';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IOrderNoteModel } from '../models/order-note-model.interface';
import mongoose, { Document, Types } from 'mongoose';
import { Type } from 'class-transformer';
import { OrderDataModel } from './order.schema';
import { MenuDataModel } from './menu.schema';

export type OrderNoteDocument = OrderNoteModel & Document;

@Schema({ versionKey: false })
export class OrderNoteModel extends BaseDocument implements IOrderNoteModel {
  @Prop({ type: String, required: true })
  note: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Type(() => OrderDataModel)
  orderId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Type(() => MenuDataModel)
  menuId: Types.ObjectId;
}

export const OrderNoteSchema = SchemaFactory.createForClass(OrderNoteModel);
