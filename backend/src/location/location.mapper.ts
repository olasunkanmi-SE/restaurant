import { Injectable } from '@nestjs/common';
import { AuditMapper } from './../audit/audit.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { LocationData } from './../infrastructure/data_access/repositories/schemas/location.schema';
import { Location } from './location';

@Injectable()
export class LocationMapper implements IMapper<Location, LocationData> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toPersistence(entity: Location): LocationData {
    const document: LocationData = {
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

  toDomain(doc: LocationData): Location {
    const {
      _id,
      address,
      address2,
      city,
      country,
      postCode,
      state,
      latitude,
      longitude,
    } = doc;
    const entity: Location = Location.create(
      {
        address,
        address2,
        city,
        country,
        postCode,
        state,
        latitude,
        longitude,
        audit: this.auditMapper.toDomain(doc),
      },
      _id,
    ).getValue();
    return entity;
  }
}
