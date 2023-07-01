import { Injectable } from '@nestjs/common';
import { AuditMapper } from 'src/audit';
import { IMapper } from 'src/domain';
import { CartItemDataModel } from 'src/infrastructure/data_access/repositories/schemas/cartItem.schema';
import { SelectedCartItemDataModel } from 'src/infrastructure/data_access/repositories/schemas/selected-cart-item.schema';
import { CartItem } from './cart-item';
import { SelectedCartItemMapper } from './selectedItems/selected-cart-item.mapper';
import { SelectedCartItem } from './selectedItems/selectedCartItem';

@Injectable()
export class CartItemMapper implements IMapper<CartItem, CartItemDataModel> {
  constructor(
    private readonly auditMapper: AuditMapper,
    private readonly selectedCartItemMapper: SelectedCartItemMapper,
  ) {}
  toPersistence(entity: CartItem): CartItemDataModel {
    const { id, menuId, orderId, total, selectedItems, audit } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    let selectedItemsToPersistence: SelectedCartItemDataModel[] = [];
    if (selectedItems.length) {
      selectedItemsToPersistence = selectedItems.map((item) => this.selectedCartItemMapper.toPersistence(item));
    }
    const cartItemDocument: CartItemDataModel = {
      _id: id,
      menuId,
      orderId,
      total,
      selectedItems: selectedItemsToPersistence,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    };
    return cartItemDocument;
  }

  toDomain(model: CartItemDataModel): CartItem {
    const { _id, menuId, orderId, total, selectedItems } = model;
    let selectedItemsToDomain: SelectedCartItem[] = [];
    if (selectedItems.length) {
      selectedItemsToDomain = selectedItems.map((item) => this.selectedCartItemMapper.toDomain(item));
    }
    const entity: CartItem = CartItem.create(
      { menuId, orderId, total, selectedItems: selectedItemsToDomain, audit: this.auditMapper.toDomain(model) },
      _id,
    ).getValue();
    return entity;
  }
}
