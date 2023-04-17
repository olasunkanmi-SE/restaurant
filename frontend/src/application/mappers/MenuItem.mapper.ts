import { ItemsSummary } from "../../components/Cart/CartItemsList";
import { CartItem, selectedItem } from "../../reducers";

export const selectedItemToMenuMapper = (selectedItem: selectedItem): Partial<CartItem> => {
  const { menuId } = selectedItem;
  return {
    id: menuId,
    menuPrice: selectedItem.menuPrice,
    selectedItems: [selectedItem],
  };
};

export const ItemToSummaryMapper = (item: selectedItem): ItemsSummary => {
  return {
    id: item.id,
    name: item.name,
    qty: item.quantity || 0,
  };
};
