import { ItemsSummary } from "../../components/Cart/CartItemsList";
import { CartItem, selectedItem } from "../../reducers";

export const selectedItemToMenuMapper = (selectedItem: selectedItem): Partial<CartItem> & { menuName: string } => {
  const { menuId } = selectedItem;
  return {
    id: menuId,
    menuName: selectedItem.menuName ?? "",
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

export const menuToMenuStateMapper = (menu: any): Partial<CartItem & { menuName?: string }>[] => {
  const { id: menuId, basePrice, name, imageUrl } = menu;
  return [
    {
      id: menuId,
      menuName: name,
      menuPrice: basePrice,
      menuTotalPrice: basePrice,
      selectedItems: [],
      imageUrl,
    },
  ];
};
