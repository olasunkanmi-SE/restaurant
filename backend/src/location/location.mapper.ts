import { LocationDataModel } from './../infrastructure/data_access/repositories/schemas/location.schema';
import { Audit } from './../domain/audit/audit';
import { AuditParser } from './../audit/audit.parser';
import { Injectable } from '@nestjs/common';
import { IMapper } from './../domain/mapper/mapper';
import { Location } from './location';

@Injectable()
export class LocationMapper implements IMapper<Location, LocationDataModel> {
  toPersistence(entity: Location): LocationDataModel {
    const model: LocationDataModel = {
      _id: entity.id,
      address: entity.address,
      address2: entity.address2,
      city: entity.city,
      country: entity.country,
      postalCode: entity.postalCode,
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
    return model;
  }

  toDomain(model: LocationDataModel): Location {
    const {
      address,
      address2,
      city,
      country,
      postalCode,
      state,
      latitude,
      longitude,
    } = model;
    const domain: Location = new Location(model._id, {
      address,
      address2,
      city,
      country,
      postalCode,
      state,
      latitude,
      longitude,
      audit: Audit.create(AuditParser.createAuditResponse(model)).getvalue(),
    });
    return domain;
  }
}
