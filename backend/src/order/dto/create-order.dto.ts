import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { currentStatus, dinningType } from '../order-entity.interface';
import { CartItemDataModel } from 'src/infrastructure/data_access/repositories/schemas/cartItem.schema';

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
  cartItems: CartItemDataModel[];
}
