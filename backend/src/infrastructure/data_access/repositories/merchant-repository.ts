import { IMapper } from './../../../domain/mapper/mapper';
import { TYPES } from './../../../application/constants/types';
import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Merchant } from './../../../merchant/merchant';
import { GenericDocumentRepository } from './../../database/';
import { MerchantDocument } from './schemas';
import { MerchantData } from './schemas/merchant.schema';

@Injectable()
export class MerchantRepository extends GenericDocumentRepository<Merchant, MerchantDocument> {
  constructor(
    @InjectModel(MerchantData.name) merchantModel: Model<MerchantDocument>,
    @InjectConnection() connection: Connection,
    @Inject(TYPES.IMapper) merchantMapper: IMapper<Merchant, MerchantDocument>,
  ) {
    super(merchantModel, connection, merchantMapper);
  }
}
