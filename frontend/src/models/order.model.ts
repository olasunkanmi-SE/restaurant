interface IOrder {
  state: string;
  type: string;
  merchantId: string;
  total: number;
  cartItems: IcartItems[];
}

interface IcartItems {
  menuId: string;
  total: number;
  quantity: number;
  selectedItems: IselectedItems[];
}

interface IselectedItems {
  itemId: string;
  menuId: string;
  price: number;
  quantity: number;
}
