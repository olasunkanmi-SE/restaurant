import { OrderSummary, SelectedItem } from "./../reducers/cartReducer";
import { useShoppingCart } from "../hooks/UseShoppingCart";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { IcartItems } from "../models/order.model";
import { ICreateOrderDTO } from "../dto/order";

const getOrderSummary = () => {
  const { GetOrderSummary } = useShoppingCart();
  return GetOrderSummary();
};

export const createOrder = async () => {
  return useAxiosPrivate();
};

const order = (): ICreateOrderDTO | undefined => {
  let order: ICreateOrderDTO | undefined;
  const orderSummary = getOrderSummary();
  if (orderSummary?.length) {
    order = {
      state: "CREATED",
      type: "DINE_IN",
      singleClientId: "63d792433b857e1697fe7017",
      total: calculateOrderTotalPrice(orderSummary) ?? 0,
      cartItems: cartItemsMapper(orderSummary),
    };
  }
  return order;
};

const calculateOrderTotalPrice = (orderSummary: OrderSummary[]) => {
  return orderSummary.reduce((acc, item) => {
    return acc + (item.menus[0]?.menuTotalPrice ?? 0);
  }, 0);
};

const calculateCartItemsTotalPrice = (selectedItems: SelectedItem[]) => {
  let totalSelectedItemsPrice = 0;
  if (selectedItems?.length) {
    totalSelectedItemsPrice = selectedItems.reduce((acc, item) => {
      return acc + Number(item?.price ?? 0);
    }, 0);
  }
  return totalSelectedItemsPrice;
};

const cartItemsMapper = (orderSummary: OrderSummary[]): IcartItems[] => {
  const menus = orderSummary.flatMap((summary) => summary.menus);
  const cartItems = menus.map((menu) => {
    return {
      menuId: menu.id,
      total: menu.menuTotalPrice ?? 0 - calculateCartItemsTotalPrice(menu.selectedItems ?? []),
      note: menu.note,
      selectedItems: menu.selectedItems?.map((item) => {
        return { ...item, itemId: item.id };
      }),
      quantity: menu.quantity,
    };
  });
  return cartItems;
};
