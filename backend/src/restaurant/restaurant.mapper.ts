import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { MenuMapper } from '../menu/menu.mapper';
import { AuditMapper } from './../audit/audit.mapper';
import { IMapper } from './../domain/mapper/mapper';
import { RestaurantData } from './../infrastructure/data_access/repositories/schemas/restaurant.schema';
import { LocationMapper } from './../location/location.mapper';
import { SingleClientMapper } from './../singleclient/singleclient.mapper';
import { Restaurant } from './restaurant';

@Injectable()
export class RestaurantMapper implements IMapper<Restaurant, RestaurantData> {
  constructor(
    private readonly auditMapper: AuditMapper,
    private readonly locationMapper: LocationMapper,
    private readonly singleclientMapper: SingleClientMapper,
    private readonly menuMapper: MenuMapper,
  ) {}
  toPersistence(entity: Restaurant): RestaurantData {
    const {
      name,
      email,
      isActive,
      webUrl,
      logoUrl,
      timeZone,
      id,
      phoneNumber,
      opened,
      imageUrl,
      paymentMethod,
      openingHour,
      closingHour,
      menus,
    } = entity;
    const singleclientId: Types.ObjectId = entity.singleclient.id;
    const document: RestaurantData = {
      _id: id,
      name,
      email,
      isActive,
      webUrl,
      logoUrl,
      timeZone,
      phoneNumber,
      opened,
      imageUrl,
      paymentMethod,
      openingHour,
      closingHour,
      menus: menus?.length ? menus.map((menu) => this.menuMapper.toPersistence(menu)) : [],
      location: this.locationMapper.toPersistence(entity.location),
      singleclientId,
      singleclient: this.singleclientMapper.toPersistence(entity.singleclient),
      auditCreatedBy: entity.audit.auditCreatedBy,
      auditCreatedDateTime: entity.audit.auditCreatedDateTime,
      auditModifiedBy: entity.audit.auditModifiedBy,
      auditModifiedDateTime: entity.audit.auditModifiedDateTime,
      auditDeletedDateTime: entity.audit.auditDeletedDateTime,
      auditDeletedBy: entity.audit.auditDeletedBy,
    };
    return document;
  }

  toDomain(document: any): Restaurant {
    const {
      name,
      email,
      isActive,
      webUrl,
      logoUrl,
      timeZone,
      _id,
      phoneNumber,
      opened,
      imageUrl,
      paymentMethod,
      openingHour,
      closingHour,
      menus,
      singleclientId,
      singleclient,
      location,
    } = document;
    const entity: Restaurant = Restaurant.create(
      {
        name,
        email,
        isActive,
        webUrl,
        logoUrl,
        phoneNumber,
        timeZone,
        opened,
        imageUrl,
        paymentMethod,
        openingHour,
        closingHour,
        singleclientId,
        menus: menus.length ? menus.map((menu) => this.menuMapper.toDomain(menu)) : [],
        location: this.locationMapper.toDomain(location),
        singleclient: singleclient ? this.singleclientMapper.toDomain(singleclient) : undefined,
        audit: this.auditMapper.toDomain(document),
      },
      _id,
    ).getValue();
    return entity;
  }
}
