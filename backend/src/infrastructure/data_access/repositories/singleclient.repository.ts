import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { SingleClient } from '../../../singleclient/singleclient';
import { SingleClientMapper } from '../../../singleclient/singleclient.mapper';
import { GenericDocumentRepository } from '../../database';
import { SingleClientDocument } from './schemas';
import { SingleClientDataModel } from './schemas/singleclient.schema';

@Injectable()
export class SingleClientRepository extends GenericDocumentRepository<SingleClient, SingleClientDocument> {
  constructor(
    @InjectModel(SingleClientDataModel.name) singleclientModel: Model<SingleClientDocument>,
    @InjectConnection() connection: Connection,
    singleclientMapper: SingleClientMapper,
  ) {
    super(singleclientModel, connection, singleclientMapper);
  }
}
