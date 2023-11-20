import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CartItem } from 'src/cart/cart-item';
import { GenericDocumentRepository } from 'src/infrastructure/database';
import { CartItemMapper } from './../../../cart/cart-item.mapper';
import { ICartItemRepository } from './interfaces/cart-item-repository.interface';
import { CartItemDataModel, CartItemDocument } from './schemas/cartItem.schema';

@Injectable()
export class CartItemRepository
  extends GenericDocumentRepository<CartItem, CartItemDocument>
  implements ICartItemRepository
{
  cartItemMapper: CartItemMapper;
  constructor(
    @InjectModel(CartItemDataModel.name) cartItemDataModel: Model<CartItemDocument>,
    @InjectConnection() readonly connection: Connection,
    cartItemMapper: CartItemMapper,
  ) {
    super(cartItemDataModel, connection, cartItemMapper);
    this.cartItemMapper = cartItemMapper;
  }

  async updateCartItemSelectedItems(cartItems: CartItem[]): Promise<void> {
    const document = cartItems.map((doc) => this.cartItemMapper.toPersistence(doc));
    document.forEach((item) => {
      this.updateOne({ _id: item._id }, { selectedItems: item.selectedItems });
    });
  }
}
