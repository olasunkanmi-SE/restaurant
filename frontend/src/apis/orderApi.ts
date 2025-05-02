import { OrderSummary, SelectedItem } from "./../reducers/cartReducer";
import { useShoppingCart } from "../hooks/UseShoppingCart";
import { IcartItems } from "../models/order.model";
import { ICreateOrderDTO } from "../dto/order";
import { calculateServiceCharge, calculateTotalOrderAmount } from "../utility/utils";

export const OrderApi = () => {
  const getOrderSummary = () => {
    const { GetOrderSummary } = useShoppingCart();
    return GetOrderSummary();
  };

  const order = (): ICreateOrderDTO | undefined => {
    let order: ICreateOrderDTO | undefined;
    const orderSummary = getOrderSummary();
    if (orderSummary?.length) {
      order = {
        state: "CREATED",
        type: "DINE_IN",
        singleClientId: "63d78441a6fda119c09b1930",
        total: calculateOrderTotalPrice(orderSummary) + serviceCharge,
        cartItems: cartItemsMapper(orderSummary),
        summary: JSON.stringify(orderSummary),
      };
    }
    return order;
  };

  const calculateOrderTotalPrice = (orderSummary: OrderSummary[]) => {
    return orderSummary.reduce((acc, item) => {
      return acc + (item.menus[0]?.menuTotalPrice ?? 0);
    }, 0);
  };

  const serviceCharge = calculateServiceCharge(calculateTotalOrderAmount());

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
  return order();
};
