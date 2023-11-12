import { CartItem } from 'src/cart/cart-item';
import { IGenericDocument } from 'src/infrastructure/database';
import { CartItemDocument } from '../schemas/cartItem.schema';

export interface ICartItemRepository extends IGenericDocument<CartItem, CartItemDocument> {
  updateCartItemSelectedItems(cartItems: CartItem[]): Promise<void>;
}
