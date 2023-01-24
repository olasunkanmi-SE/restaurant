import { IAudit } from './../infrastructure/database/mongoDB/base-document.interface';
export interface ICategoryResponseDTO extends IAudit {
  name: string;
  code: string;
  description?: string;
}
