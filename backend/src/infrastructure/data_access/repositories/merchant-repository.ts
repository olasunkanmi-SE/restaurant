import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Merchant } from './../../../merchant/merchant';
import { MerchantMapper } from './../../../merchant/merchant.mapper';
import { GenericDocumentRepository } from './../../database/';
import { MerchantDocument } from './schemas';
import { MerchantDataModel } from './schemas/merchant.schema';

@Injectable()
export class MerchantRepository extends GenericDocumentRepository<Merchant, MerchantDocument> {
  constructor(
    @InjectModel(MerchantDataModel.name) merchantModel: Model<MerchantDocument>,
    @InjectConnection() connection: Connection,
    merchantMapper: MerchantMapper,
  ) {
    super(merchantModel, connection, merchantMapper);
  }
}
