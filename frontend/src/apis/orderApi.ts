import { SelectedItem } from "./../reducers/cartReducer";
import { useShoppingCart } from "../hooks/UseShoppingCart";

export const createOrder = async (order: any) => {};

const getOrderSummary = () => {
  const { GetOrderSummary } = useShoppingCart();
  return GetOrderSummary();
};

const reduceSelectedItems = () => {
  const orderSummary = getOrderSummary();
  let selectedItems: SelectedItem[] = [];
  if (orderSummary?.length) {
    selectedItems = orderSummary.reduce((result: SelectedItem[], item) => {
      if (item.menus?.length) {
        item.menus.forEach((menu) => {
          if (menu.selectedItems) {
            menu.selectedItems.forEach((selectedItem) => {
              const itemId = selectedItem.id;
              const existingItem = result.find((item: any) => item.id === itemId);
              if (existingItem) {
                existingItem.price += selectedItem.price;
                existingItem.quantity! += selectedItem.quantity!;
              } else {
                result.push({ ...selectedItem });
              }
            });
          }
        });
      }
      return result;
    }, []);
  }
  return selectedItems;
};

const getCartItems = () => {
  const orderSummary = getOrderSummary();
  if (orderSummary?.length) {
    const selectedItemsMap = new Map<string, SelectedItem>();
    reduceSelectedItems.forEach((item) => {});
    orderSummary.map((summary) => {
      const cartItem = summary.menus;
    });
  }
};
