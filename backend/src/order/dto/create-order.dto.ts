import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { currentStatus, dinningType } from '../order-entity.interface';

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

export class CreateCartItemsDTO {
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
  selectedItems: CreateSelectedItemsDTO[];
}

export class CreateSelectedItemsDTO {
  @IsNotEmpty()
  @IsString()
  cartItemId: string;

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
