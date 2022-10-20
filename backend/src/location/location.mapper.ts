import { LocationDataDocument } from './../infrastructure/data_access/repositories/schemas/location.schema';
import { Injectable } from '@nestjs/common';
import { IMapper } from './../domain/mapper/mapper';
import { Location } from './location';
import { AuditMapper } from 'src/audit/audit.mapper';

@Injectable()
export class LocationMapper implements IMapper<Location, LocationDataDocument> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: Location): LocationDataDocument {
    const document: LocationDataDocument = {
      _id: entity.id,
      address: entity.address,
      address2: entity.address2,
      city: entity.city,
      country: entity.country,
      postCode: entity.postCode,
      state: entity.state,
      latitude: entity.latitude,
      longitude: entity.longitude,
      auditCreatedBy: entity.audit.auditCreatedBy,
      auditCreatedDateTime: entity.audit.auditCreatedDateTime,
      auditModifiedBy: entity.audit.auditModifiedBy,
      auditModifiedDateTime: entity.audit.auditModifiedDateTime,
      auditDeletedDateTime: entity.audit.auditDeletedDateTime,
      auditDeletedBy: entity.audit.auditDeletedBy,
    };
    return document;
  }

  toDomain(doc: LocationDataDocument): Location {
    const {
      address,
      address2,
      city,
      country,
      postCode,
      state,
      latitude,
      longitude,
    } = doc;
    const entity: Location = Location.create({
      address,
      address2,
      city,
      country,
      postCode,
      state,
      latitude,
      longitude,
      audit: this.auditMapper.toDomain(doc),
    }).getValue();
    return entity;
  }
}
