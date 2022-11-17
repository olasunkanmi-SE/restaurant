import { MerchantMapper } from './../merchant/merchant.mapper';
import { Injectable } from '@nestjs/common';
import { AuditMapper } from './../audit/audit.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { RestaurantData } from './../infrastructure/data_access/repositories/schemas/restaurant.schema';
import { LocationMapper } from './../location/location.mapper';
import { Restaurant } from './restaurant';
import { Types } from 'mongoose';

@Injectable()
export class RestaurantMapper implements IMapper<Restaurant, RestaurantData> {
  constructor(
    private readonly auditMapper: AuditMapper,
    private readonly locationMapper: LocationMapper,
    private readonly merchantMapper: MerchantMapper,
  ) {}
  toPersistence(entity: Restaurant): RestaurantData {
    const merchantId: Types.ObjectId = entity.merchant.id;
    const document: RestaurantData = {
      _id: entity.id,
      name: entity.name,
      email: entity.email,
      isActive: entity.isActive,
      webUrl: entity.webUrl,
      logoUrl: entity.logoUrl,
      timeZone: entity.timeZone,
      phoneNumber: entity.phoneNumber,
      location: this.locationMapper.toPersistence(entity.location),
      merchantId,
      merchant: this.merchantMapper.toPersistence(entity.merchant),
      auditCreatedBy: entity.audit.auditCreatedBy,
      auditCreatedDateTime: entity.audit.auditCreatedDateTime,
      auditModifiedBy: entity.audit.auditModifiedBy,
      auditModifiedDateTime: entity.audit.auditModifiedDateTime,
      auditDeletedDateTime: entity.audit.auditDeletedDateTime,
      auditDeletedBy: entity.audit.auditDeletedBy,
    };
    return document;
  }

  toDomain(document: RestaurantData): Restaurant {
    const { name, email, isActive, webUrl, logoUrl, timeZone, _id, phoneNumber } = document;
    const entity: Restaurant = Restaurant.create(
      {
        name,
        email,
        isActive,
        webUrl,
        logoUrl,
        phoneNumber,
        timeZone,
        location: this.locationMapper.toDomain(document.location),
        merchant: this.merchantMapper.toDomain(document.merchant),
        audit: this.auditMapper.toDomain(document),
      },
      _id,
    ).getValue();
    return entity;
  }
}
