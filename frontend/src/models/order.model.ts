export interface IOrder {
  state: string;
  type: string;
  merchantId: string;
  total: number;
  cartItems: IcartItems[];
}

export interface IcartItems {
  menuId?: string;
  total: number;
  quantity?: number;
  selectedItems?: IselectedItems[];
  note?: string;
}

export interface IselectedItems {
  id: string;
  itemId: string;
  menuId: string;
  price: number;
  quantity?: number;
  menuPrice: number;
}
