import { CartItem } from 'src/cart/cart-item';
import { IGenericDocument } from 'src/infrastructure/database';
import { CartItemDocument } from '../schemas/cartItem.schema';
import { Result } from 'src/domain';
import { ClientSession } from 'mongoose';

export interface ICartItemRepository extends IGenericDocument<CartItem, CartItemDocument> {
  updateCartItemSelectedItems(cartItems: CartItem[], options?: { session: ClientSession }): Promise<Result<CartItem[]>>;
}
