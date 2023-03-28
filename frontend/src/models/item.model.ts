import { IAudit } from "./audit.model";

export type portion = "sharing" | "single";

export interface IItem extends IAudit {
  id: string;
  name: string;
  description?: string;
  price: number;
  maximumPermitted: number;
}
