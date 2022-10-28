import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GenericDocumentRepository } from './../../database/';
import { MerchantDocument } from './schemas';
import { MerchantData } from './schemas/merchant.schema';

@Injectable()
export class MerchantRepository extends GenericDocumentRepository<MerchantDocument> {
  constructor(
    @InjectModel(MerchantData.name) merchantModel: Model<MerchantDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(merchantModel, connection);
  }
}
