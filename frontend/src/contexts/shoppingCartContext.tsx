import { createContext, useMemo, useReducer, useState } from "react";
import { selectedItemToMenuMapper } from "../application/mappers/MenuItem.mapper";
import { CartActionsType, CartItem, cartReducer, initialCartState, selectedItem } from "../reducers";
import { ShoppingCart } from "../components/Cart";

type shoppingCartProviderProps = {
  children: React.ReactNode;
};

export const shoppingCartContext = createContext({} as shoppingCartProps);

export type shoppingCartProps = {
  totalPrice: number;
  menus: Partial<CartItem>[];
  quantity: number;
  openCart(): void;
  closeCart(): void;
  addMenuToCart(payload: CartItem): void;
  removeMenuFromCart(cartItem: CartItem): void;
  addItemToCart(menuItem: selectedItem): void;
  removeItemFromCart(menuItem: selectedItem): void;
  getMenuQuantity(id: string): number;
};

export const ShoppingCartProvider = ({ children }: shoppingCartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const shoppingCartState = useMemo(() => {
    const openCart = () => {
      setIsOpen(true);
    };
    const closeCart = () => {
      setIsOpen(false);
    };

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
          if (!found.quantity) {
            state.quantity += 1;
            found.quantity = 1;
          } else {
            state.quantity += 1;
            found.quantity += 1;
            state.totalPrice += payload.basePrice;
          }
        }
      }

      console.log(state);
      dispatch({
        type: CartActionsType.ADD_MENU_TO_CART,
      });
    };

    const removeMenuFromCart = (cartItem: CartItem) => {
      const menus = state.menus;
      if (menus.length) {
        const menu = state.menus.find((c) => c.id === cartItem.id);
        let menuQty = 0;
        if (menu) {
          if (menu.quantity && menu.quantity > 0) {
            menuQty = menu.quantity;
            menuQty -= 1;
          }
          if (menu.quantity && menu.quantity === 1) {
            const index = state.menus.findIndex((menu) => menu.id === cartItem.id);
            if (index > -1) {
              state.menus.splice(index, 1);
            }
          }
          if (menuQty > 0) {
            menu.quantity = menuQty;
          }
          console.log(state.menus);
        }
      }

      dispatch({
        type: CartActionsType.REMOVE_MENU_FROM_CART,
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
      let selectedItems: selectedItem[] | undefined = [];
      const selectedItemMap = new Map<string, selectedItem>();

      if (state.menus.length) {
        state.menus.forEach((menu) => {
          if (menuItem.menuId === menu.id) {
            selectedItems = menu.selectedItems || [];
            if (!selectedItems?.length) {
              menuItem.quantity = 0;
              selectedItems.push(menuItem);
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

      dispatch({
        type: CartActionsType.ADD_ITEM_TO_CART,
      });
    };

    const getMenuQuantity = (id: string): number => {
      const menus = state.menus;
      let quantity = 0;
      menus.forEach((menu) => {
        if (menu.id === id) {
          quantity = menu.quantity ? menu.quantity : 0;
        }
      });
      return quantity;
    };

    const value: shoppingCartProps = {
      totalPrice: state.totalPrice,
      menus: state.menus,
      quantity: state.quantity,
      addMenuToCart,
      removeMenuFromCart,
      addItemToCart,
      removeItemFromCart,
      getMenuQuantity,
      openCart,
      closeCart,
    };
    return value;
  }, [state]);

  return (
    <shoppingCartContext.Provider value={shoppingCartState}>
      {children} <ShoppingCart isOpen={isOpen} />
    </shoppingCartContext.Provider>
  );
};
