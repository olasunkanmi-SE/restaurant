import { Types } from 'mongoose';
import { IAudit } from 'src/infrastructure';

export interface IOrderResponseDTO extends IAudit {
  id: Types.ObjectId;
  state: string;
  type: string;
  merchantId: Types.ObjectId;
  customerId?: Types.ObjectId;
  total: number;
  quantity: number;
  discount?: number;
  orderManagerId?: Types.ObjectId;
}
