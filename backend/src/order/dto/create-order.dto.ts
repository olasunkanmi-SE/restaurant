import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { currentStatus, dinningType } from '../order-entity.interface';
import { Types } from 'mongoose';

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty()
  state: currentStatus;

  @IsString()
  @IsNotEmpty()
  type: dinningType;

  @IsString()
  @IsNotEmpty()
  merchantId: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsOptional()
  @IsArray()
  cartItems: CreateCartItemsDTO[];
}

class CreateCartItemsDTO {
  @IsString()
  @IsNotEmpty()
  menuId: Types.ObjectId;

  @IsNotEmpty()
  orderId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  note: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  @IsArray()
  cartItems: CreateSelectedItemsDTO[];
}

class CreateSelectedItemsDTO {
  @IsNotEmpty()
  cartItemId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  menuId: string;

  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
