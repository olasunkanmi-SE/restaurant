import { createContext, useMemo, useReducer } from "react";
import { CartActionsType, CartItem, cartReducer, initialCartState, selectedItem } from "../reducers";
import { selectedItemToMenuMapper } from "../application/mappers/MenuItem.mapper";

type shoppingCartProviderProps = {
  children: React.ReactNode;
};

export const shoppingCartContext = createContext({} as shoppingCartProps);

export type shoppingCartProps = {
  totalPrice: number;
  menus: Partial<CartItem>[];
  quantity: number;
  addMenuToCart(payload: CartItem): void;
  removeFromCart(cartItem: CartItem): void;
  addItemToCart(menuItem: selectedItem): void;
  removeItemFromCart(menuItem: selectedItem): void;
};

export const ShoppingCartProvider = ({ children }: shoppingCartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const shoppingCartState = useMemo(() => {
    const addMenuToCart = (payload: CartItem) => {
      let menus: Partial<CartItem>[] = state.menus;

      if (!state.menus.length) {
        payload.selectedItems = [];
        state.menus.push(payload);
      }

      if (state.menus.length) {
        const found = menus.find((menu) => menu?.id === payload.id);
        if (!found) {
          state.menus = [...state.menus, payload];
          state.totalPrice += payload.basePrice;
          state.quantity += 1;
          payload.quantity = 1;
        } else {
          state.quantity += 1;
          found.quantity! += 1;
          state.totalPrice += payload.basePrice;
        }
      }

      console.log(state);
      dispatch({
        type: CartActionsType.ADD_TO_CART,
      });
    };
    const removeFromCart = (cartItem: CartItem) => {
      const cartIndex = state.menus.findIndex((c) => c.id === cartItem.id);
      if (cartIndex > -1) {
        state.menus.splice(cartIndex, 1);
        if (state.quantity && state.totalPrice !== 0) {
          state.quantity -= 1;
          state.totalPrice -= cartItem.basePrice;
        }
      }
      dispatch({
        type: CartActionsType.REMOVE_FROM_CART,
      });
    };

    const removeItemFromCart = (menuItem: selectedItem) => {
      let { menus } = state;
      const menuItems: selectedItem[] = [];

      for (const menu of menus) {
        if (menu.id === menuItem.menuId) {
          if (menu.selectedItems && menu.selectedItems.length) {
            menuItems.push(...menu.selectedItems);
          }
        }
      }

      if (menuItems.length) {
        for (const item of menuItems) {
          if (menuItem.id === item.id) {
            if (item.quantity && item.quantity > 1) {
              item.quantity -= 1;
            } else {
              item.quantity = 0;
            }
          }
        }
      }
      dispatch({
        type: CartActionsType.REMOVE_ITEM_FROM_CART,
      });
    };

    const addItemToCart = (menuItem: selectedItem) => {
      let { menus } = state;
      const menu: Partial<CartItem> = selectedItemToMenuMapper(menuItem);
      if (!menus.length) {
        menuItem.quantity = 0;
        state.menus.push(menu);
      }
      if (menus.length) {
        const index = menus.findIndex((menu) => menu.id === menuItem.menuId);
        if (index === -1) {
          menuItem.quantity = 0;
          state.menus.push(menu);
        }
      }
      let selectedItems: selectedItem[] | undefined;
      const selectedItemMap = new Map<string, selectedItem>();

      if (state.menus.length) {
        state.menus.forEach((menu) => {
          if (menuItem.menuId === menu.id) {
            selectedItems = menu.selectedItems;
            if (!selectedItems?.length) {
              menuItem.quantity = 0;
              selectedItems!.push(menuItem);
            }
          }
        });

        if (selectedItems?.length) {
          const index = selectedItems.findIndex((item) => item.id === menuItem.id);
          if (index === -1) {
            menuItem.quantity = 0;
            selectedItems.push(menuItem);
          }
        }

        selectedItems?.forEach((item) => selectedItemMap.set(item.id, item));
        for (const item of selectedItemMap.values()) {
          if (item.id === menuItem.id) {
            item.quantity! += 1;
          }
        }
      }

      if (selectedItems && selectedItems.length) {
        let totalItemPrice: number = 0;
        if (state.quantity > 0) {
          state.totalPrice += menuItem.price;
        } else {
          selectedItems.forEach((item) => {
            totalItemPrice += item.quantity! * item.price;
            state.totalPrice = totalItemPrice + menuItem.menuPrice;
          });
        }
      }
      console.log(state);

      dispatch({
        type: CartActionsType.ADD_ITEM_TO_CART,
      });
    };

    const value: shoppingCartProps = {
      totalPrice: state.totalPrice,
      menus: state.menus,
      quantity: state.quantity,
      addMenuToCart,
      removeFromCart,
      addItemToCart,
      removeItemFromCart,
    };
    return value;
  }, [state]);

  return <shoppingCartContext.Provider value={shoppingCartState}>{children}</shoppingCartContext.Provider>;
};
