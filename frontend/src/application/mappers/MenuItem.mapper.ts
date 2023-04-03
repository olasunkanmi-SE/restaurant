import { CartItem, selectedItem } from "../../reducers";

export const selectedItemToMenuMapper = (selectedItem: selectedItem): Partial<CartItem> => {
  const { menuId } = selectedItem;
  return {
    id: menuId,
    selectedItems: [selectedItem],
  };
};
