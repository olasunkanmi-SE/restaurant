import { LocationMapper } from './../location/location.mapper';
import { RestaurantDataDocument } from './../infrastructure/data_access/repositories/schemas/restaurant.schema';
import { AuditMapper } from './../audit/audit.mapper';
import { Restaurant } from './restaurant';
import { IMapper } from './../domain/mapper/mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantMapper
  implements IMapper<Restaurant, RestaurantDataDocument>
{
  constructor(
    private readonly auditMapper: AuditMapper,
    private readonly locationMapper: LocationMapper,
  ) {}
  toPersistence(entity: Restaurant): RestaurantDataDocument {
    const document: RestaurantDataDocument = {
      name: entity.name,
      email: entity.email,
      isActive: entity.isActive,
      webUrl: entity.webUrl,
      logoUrl: entity.logoUrl,
      timeZone: entity.timeZone,
      location: this.locationMapper.toPersistence(entity.location),
      auditCreatedBy: entity.audit.auditCreatedBy,
      auditCreatedDateTime: entity.audit.auditCreatedDateTime,
      auditModifiedBy: entity.audit.auditModifiedBy,
      auditModifiedDateTime: entity.audit.auditModifiedDateTime,
      auditDeletedDateTime: entity.audit.auditDeletedDateTime,
      auditDeletedBy: entity.audit.auditDeletedBy,
    };
    return document;
  }

  toDomain(document: RestaurantDataDocument): Restaurant {
    const { name, email, isActive, webUrl, logoUrl, timeZone } = document;
    const entity: Restaurant = Restaurant.create({
      name,
      email,
      isActive,
      webUrl,
      logoUrl,
      timeZone,
      location: this.locationMapper.toDomain(document.location),
      audit: this.auditMapper.toDomain(document),
    }).getValue();
    return entity;
  }
}
