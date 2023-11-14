import { Types } from 'mongoose';
import { IAudit } from 'src/infrastructure';

export interface IOrderStatusResponseDTO extends IAudit {
  id: Types.ObjectId;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
}
