import { SelectedCartItemMapper } from './../../../cart/selectedItems/selected-cart-item.mapper';
import { SelectedCartItem } from 'src/cart/selectedItems/selectedCartItem';
import { SelectedCartItemDataModel, SelectedCartItemDocument } from './schemas/selected-cart-item.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GenericDocumentRepository } from 'src/infrastructure/database';

export class SelectedCartItemRepository extends GenericDocumentRepository<SelectedCartItem, SelectedCartItemDocument> {
  selectedCartItemMapper: SelectedCartItemMapper;
  constructor(
    @InjectModel(SelectedCartItemDataModel.name) selectedCartItemDataModel: Model<SelectedCartItemDocument>,
    @InjectConnection() readonly connection: Connection,
    selectedCartItemMapper: SelectedCartItemMapper,
  ) {
    super(selectedCartItemDataModel, connection, selectedCartItemMapper);
    this.selectedCartItemMapper = selectedCartItemMapper;
  }
}
