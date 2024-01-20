import { IcartItems } from "../models/order.model";

export interface ICreateOrderDTO {
  state: string;
  type: string;
  singleClientId: string;
  total: number;
  cartItems: IcartItems[];
  summary: string;
}
