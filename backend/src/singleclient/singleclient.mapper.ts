import { Injectable } from '@nestjs/common';
import { SingleClientDataModel } from './../infrastructure/data_access/repositories/schemas/singleclient.schema';
import { AuditMapper } from '../audit/audit.mapper';
import { IMapper } from '../domain/mapper/mapper';
import { SingleClient } from './singleclient';

@Injectable()
export class SingleClientMapper implements IMapper<SingleClient, SingleClientDataModel> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: SingleClient): SingleClientDataModel {
    const document: SingleClientDataModel = {
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
      refreshTokenHash: entity.refreshTokenHash,
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

  toDomain(doc: SingleClientDataModel): SingleClient {
    const {
      _id,
      firstName,
      lastName,
      email,
      organisationName,
      phoneNumber,
      passwordHash,
      refreshTokenHash,
      role,
      isActive,
      status,
      organisationAddress,
    } = doc;
    const entity: SingleClient = SingleClient.create(
      {
        firstName,
        lastName,
        email,
        organisationName,
        phoneNumber,
        passwordHash,
        refreshTokenHash,
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
