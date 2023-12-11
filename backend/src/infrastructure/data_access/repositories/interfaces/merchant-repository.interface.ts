import { IGenericDocument } from 'src/infrastructure/database';
import { SingleClient } from 'src/singleclient';
import { SingleClientDocument } from '../schemas';

export interface ISingleClientRepository extends IGenericDocument<SingleClient, SingleClientDocument> {}
