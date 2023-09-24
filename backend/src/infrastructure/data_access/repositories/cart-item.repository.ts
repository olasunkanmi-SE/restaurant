import { CartItemMapper } from './../../../cart/cart-item.mapper';
import { Injectable } from '@nestjs/common';
import { CartItem } from 'src/cart/cart-item';
import { GenericDocumentRepository } from 'src/infrastructure/database';
import { CartItemDataModel, CartItemDocument } from './schemas/cartItem.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class CartItemRepository extends GenericDocumentRepository<CartItem, CartItemDocument> {
  cartItemMapper: CartItemMapper;
  constructor(
    @InjectModel(CartItemDataModel.name) cartItemDataModel: Model<CartItemDocument>,
    @InjectConnection() readonly connection: Connection,
    cartItemMapper: CartItemMapper,
  ) {
    super(cartItemDataModel, connection, cartItemMapper);
  }
}
