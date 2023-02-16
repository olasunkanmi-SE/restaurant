import { Addon } from './../addon/addon';
import { Audit } from './../domain/audit/audit';
import { portion } from '../infrastructure/data_access/repositories/models/item-model.interface';
export interface IITem {
  name: string;
  description?: string;
  portion: portion;
  price: number;
  quantity?: number;
  image: string;
  tags?: string[];
  maximumPermitted?: number;
  taxRate?: number;
  audit: Audit;
  addons: Addon[];
}
