import { CartItem, cartState, selectedItem } from "../../reducers";

export const selectedItemToMenuMapper = (selectedItem: selectedItem): Partial<CartItem> => {
  const { menuId } = selectedItem;
  return {
    id: menuId,
    selectedItems: [selectedItem],
  };
};

// export const virtualStateToStateMapper = (virtualState: cartState) => {
//   const state =
// };
