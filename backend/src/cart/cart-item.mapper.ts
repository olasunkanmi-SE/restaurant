import { HttpStatus, Injectable } from '@nestjs/common';
import { AuditMapper } from '../audit';
import { IMapper } from '../domain';
import { CartItemDataModel } from '../infrastructure/data_access/repositories/schemas/cartItem.schema';
import { throwApplicationError } from '../infrastructure/utilities/exception-instance';
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
    try {
      const { id, menuId, orderId, total, selectedItems, audit } = entity;
      const {
        auditCreatedBy,
        auditCreatedDateTime,
        auditModifiedBy,
        auditModifiedDateTime,
        auditDeletedBy,
        auditDeletedDateTime,
      } = audit;
      const cartItemDocument: CartItemDataModel = {
        _id: id,
        menuId,
        orderId,
        total,
        selectedItems: selectedItems?.length
          ? selectedItems.map((item) => this.selectedCartItemMapper.toPersistence(item))
          : [],
        auditCreatedBy,
        auditCreatedDateTime,
        auditModifiedBy,
        auditModifiedDateTime,
        auditDeletedBy,
        auditDeletedDateTime,
      };
      return cartItemDocument;
    } catch (error: any) {
      throwApplicationError(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  toDomain(model: CartItemDataModel): CartItem {
    const { _id, menuId, orderId, total, selectedItems } = model;
    let selectedItemsToDomain: SelectedCartItem[] = [];
    if (selectedItems?.length) {
      selectedItemsToDomain = selectedItems.map((item) => this.selectedCartItemMapper.toDomain(item));
    }
    const entity: CartItem = CartItem.create(
      { menuId, orderId, total, selectedItems: selectedItemsToDomain, audit: this.auditMapper.toDomain(model) },
      _id,
    );
    return entity;
  }
}
