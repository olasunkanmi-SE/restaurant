import { IAudit } from "./audit.model";

export interface ICategory extends IAudit {
  id: string;
  name: string;
  code: string;
  description?: string;
}
