import { createContext, useMemo, useReducer, useState } from "react";
import { selectedItemToMenuMapper } from "../application/mappers/MenuItem.mapper";
import { CartActionsType, CartItem, OrderSummary, cartReducer, initialCartState, selectedItem } from "../reducers";
import { ShoppingCart } from "../components/ShoppingCart";

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
  increaseMenuQuantity(payload: Partial<CartItem>): void;
  removeMenuFromCart(cartItem: Partial<CartItem>): void;
  addItemToCart(menuItem: selectedItem): void;
  removeItemFromCart(menuItem: selectedItem): void;
  getMenuQuantity(id: string): number;
  calculateMenuTotalPriceFromMenuItems(id: string): number | undefined;
  itemPrice(id: string): number | undefined;
  AddMoreMenu(id: string): number | undefined;
  addMenuToCart(): void;
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

    const AddMoreMenu = (id: string): number | undefined => {
      const menu = state.menus.find((menu) => menu.id === id);
      if (menu && menu.selectedItems) {
        const menuPrice = calculateMenuTotalPriceFromMenuItems(id)! * menu.quantity!;
        menu.menuTotalPrice = menuPrice;
      }
      return menu!.menuTotalPrice;
    };

    const increaseMenuQuantity = (payload: CartItem) => {
      console.log(state);
      let menus: Partial<CartItem>[] = state.menus;

      if (!state.menus.length) {
        payload.selectedItems = [];
        state.menus.push(payload);
      }

      if (state.menus.length) {
        const found = menus.find((menu) => menu?.id === payload.id);
        if (!found) {
          state.menus = [...state.menus, payload];
          state.quantity += 1;
          payload.quantity = 1;
        } else {
          if (!found.quantity) {
            state.quantity = state.quantity === 0 ? state.quantity + 2 : (state.quantity += 1);
            found.quantity = 2;
          } else {
            state.quantity += 1;
            found.quantity += 1;
          }
        }
      }
      state.totalPrice = AddMoreMenu(payload.id)!;
      dispatch({
        type: CartActionsType.INCREASE_MENU_QUANTITY,
      });
    };

    const removeMenuFromCart = (cartItem: CartItem) => {
      if (state.menus.length) {
        const menu = state.menus.find((c) => c.id === cartItem.id);
        let menuQty = 0;
        if (menu) {
          if (menu.quantity && menu.quantity > 0) {
            menuQty = menu.quantity;
            menuQty -= 1;
            const onePortion = menu.menuTotalPrice! / menu.quantity;
            menu.menuTotalPrice! = menu.menuTotalPrice! - onePortion;
            if (menu.menuTotalPrice < menu.menuPrice! && menu.selectedItems?.length) {
              menu.selectedItems = [];
              menu.menuTotalPrice = menu.menuPrice;
            }
            if (state.menus.length === 1) {
              state.totalPrice = menu.menuTotalPrice!;
            }
            state.quantity -= 1;
            if (menu.quantity === 0) {
              menu.quantity = undefined;
            }
          }
          if (menu.quantity && menu.quantity === 1) {
            const index = state.menus.findIndex((menu) => menu.id === cartItem.id);
            if (index > -1) {
              state.menus.splice(index, 1);
            }
          }
          if (menuQty >= 0) {
            menu.quantity = menuQty;
          }
        }
        if (!state.menus.length) {
          state.totalPrice = 0;
        }
      }
      console.log(state);
      dispatch({
        type: CartActionsType.REMOVE_MENU_FROM_CART,
      });
    };

    const removeItemFromCart = (menuItem: selectedItem) => {
      const menu = state.menus.find((menu) => menu.id === menuItem.menuId);
      if (menu && menu.menuTotalPrice) {
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
              if (item.quantity && item.quantity >= 1) {
                item.quantity -= 1;
                menu.menuTotalPrice -= item.price * menu.quantity!;
                state.totalPrice = menu.menuTotalPrice;
              } else {
                item.quantity = 0;
              }
            }
          }
        }
        dispatch({
          type: CartActionsType.REMOVE_ITEM_FROM_CART,
        });
      }
    };

    const calculateMenuTotalPriceFromMenuItems = (id: string): number | undefined => {
      const menu: Partial<CartItem> | undefined = state.menus.find((menu) => menu.id === id);
      let totalPrice: number = 0;
      if (menu) {
        const selectedItems: selectedItem[] = menu.selectedItems || [];
        let orderPrice: number = 0;
        if (selectedItems?.length) {
          selectedItems.forEach((item) => {
            orderPrice += item.price * (item.quantity ?? 1);
          });
          totalPrice = menu.menuPrice! + orderPrice;
        }
        return (menu.menuTotalPrice = totalPrice);
      }
    };

    const itemPrice = (id: string): number | undefined => {
      const menu = state.menus.find((menu) => menu.id === id);
      if (menu) {
        return menu.menuTotalPrice;
      }
    };

    const addItemToCart = (menuItem: selectedItem) => {
      console.log(state);
      let { menus } = state;
      const menu: Partial<CartItem> = selectedItemToMenuMapper(menuItem);
      if (!menus.length) {
        menuItem.quantity = 0;
        state.menus.push(menu);
      }
      const itemMenu = menus.find((menu) => menu.id === menuItem.menuId);
      if (menus.length && itemMenu && !itemMenu.quantity) {
        const index = menus.findIndex((menu) => menu.id === menuItem.menuId);
        if (index === -1) {
          menuItem.quantity = 0;
          state.menus.push(menu);
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
        calculateMenuTotalPriceFromMenuItems(menuItem.menuId);
      } else {
        if (itemMenu) {
          const selectedItems: selectedItem[] | undefined = itemMenu.selectedItems;
          if (selectedItems) {
            const selectedItem = selectedItems.find((i) => i.id === menuItem.id);
            if (selectedItem) {
              selectedItem.quantity! += 1;
              itemMenu.menuTotalPrice = itemMenu.menuTotalPrice! + selectedItem.price * itemMenu.quantity!;
              state.totalPrice = itemMenu.menuTotalPrice;
            }
            if (!selectedItem && selectedItems.length) {
              menuItem.quantity = 1;
              let itemTotal = 0;
              selectedItems.push(menuItem);
              itemMenu.menuTotalPrice = itemMenu.menuTotalPrice! + menuItem.price * itemMenu.quantity!;
              state.totalPrice = itemMenu.menuTotalPrice;
            }
          }
        }
        console.log(state);
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

    const addMenuToCart = () => {
      let { menus, quantity, orderSummary } = state;
      const orderInfo: OrderSummary = {
        menus,
        quantity,
      };
      orderSummary.push(orderInfo);
      state.menus[0].quantity = 1;
      state.menus = [];
      console.log(state);
      return state;
    };
    const resetMenuState = () => {};

    const value: shoppingCartProps = {
      totalPrice: state.totalPrice,
      menus: state.menus,
      quantity: state.quantity,
      increaseMenuQuantity,
      removeMenuFromCart,
      addItemToCart,
      removeItemFromCart,
      getMenuQuantity,
      openCart,
      closeCart,
      calculateMenuTotalPriceFromMenuItems,
      itemPrice,
      AddMoreMenu,
      addMenuToCart,
    };
    return value;
  }, [state]);

  return (
    <shoppingCartContext.Provider value={shoppingCartState}>
      {children} <ShoppingCart isOpen={isOpen} />
    </shoppingCartContext.Provider>
  );
};
