import { Injectable } from '@nestjs/common';
import { MerchantData } from './../infrastructure/data_access/repositories/schemas/merchant.schema';
import { AuditMapper } from './../audit/audit.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { Merchant } from './merchant';

@Injectable()
export class MerchantMapper implements IMapper<Merchant, MerchantData> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: Merchant): MerchantData {
    const document: MerchantData = {
      _id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      organisationName: entity.organisationName,
      phoneNumber: entity.phoneNumber,
      passwordHash: entity.passwordHash,
      role: entity.role,
      isActive: entity.isActive,
      status: entity.status,
      organisationAddress: entity.organisationAddress,
      auditCreatedBy: entity.audit.auditCreatedBy,
      auditCreatedDateTime: entity.audit.auditCreatedDateTime,
      auditModifiedBy: entity.audit.auditModifiedBy,
      auditModifiedDateTime: entity.audit.auditModifiedDateTime,
      auditDeletedDateTime: entity.audit.auditDeletedDateTime,
      auditDeletedBy: entity.audit.auditDeletedBy,
    };
    return document;
  }

  toDomain(doc: MerchantData): Merchant {
    const {
      _id,
      firstName,
      lastName,
      email,
      organisationName,
      phoneNumber,
      passwordHash,
      role,
      isActive,
      status,
      organisationAddress,
    } = doc;
    const entity: Merchant = Merchant.create(
      {
        firstName,
        lastName,
        email,
        organisationName,
        phoneNumber,
        passwordHash,
        role,
        isActive,
        status,
        organisationAddress,
        audit: this.auditMapper.toDomain(doc),
      },
      _id,
    ).getValue();
    return entity;
  }
}
