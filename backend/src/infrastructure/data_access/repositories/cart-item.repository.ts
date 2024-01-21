import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CartItem } from 'src/cart/cart-item';
import { Result } from 'src/domain';
import { GenericDocumentRepository } from 'src/infrastructure/database';
import { throwApplicationError } from 'src/infrastructure/utilities/exception-instance';
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

  async updateCartItemSelectedItems(cartItems: CartItem[]): Promise<Result<CartItem[]>> {
    try {
      const document = cartItems.map((doc) => this.cartItemMapper.toPersistence(doc));
      const selectedItemsToUpdate = document.map((doc) => ({ _id: doc._id, selectedItems: doc.selectedItems }));
      const result = await this.updateMany(
        { _id: { $in: document.map((doc) => doc._id) } },
        { $set: { selectedItems: selectedItemsToUpdate } },
      );
      if (!result.isSuccess) {
        throwApplicationError(HttpStatus.BAD_REQUEST, '');
      }
      return result;
    } catch (error) {
      console.error('an error occured', error);
    }
  }
}
