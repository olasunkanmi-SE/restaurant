import { AuditMapper } from 'src/audit';
import { IMapper } from 'src/domain';
import { SelectedCartItemDataModel } from 'src/infrastructure/data_access/repositories/schemas/selected-cart-item.schema';
import { SelectedCartItem } from './selectedCartItem';

export class SelectedCartItemMapper implements IMapper<SelectedCartItem, SelectedCartItemDataModel> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: SelectedCartItem): SelectedCartItemDataModel {
    const { id, menuId, itemId, price, quantity, audit } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    const selectedCartItemDocument: SelectedCartItemDataModel = {
      _id: id,
      menuId,
      itemId,
      price,
      quantity,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    };
    return selectedCartItemDocument;
  }

  toDomain(model: SelectedCartItemDataModel): SelectedCartItem {
    const { _id, menuId, itemId, price, quantity } = model;
    const entity: SelectedCartItem = SelectedCartItem.create(
      {
        menuId,
        itemId,
        price,
        quantity,
        audit: this.auditMapper.toDomain(model),
      },
      _id,
    ).getValue();
    return entity;
  }
}
