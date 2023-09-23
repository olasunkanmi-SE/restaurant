import { CartItemDataModel } from 'src/infrastructure/data_access/repositories/schemas/cartItem.schema';

export class CreateOrderDTO {
  state: string;
  type: string;
  merchantId: string;
  total: number;
  quantity: number;
  cartItems: CartItemDataModel[];
}
