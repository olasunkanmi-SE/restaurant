import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { menuToMenuStateMapper, selectedItemToMenuMapper } from "../application/mappers/MenuItem.mapper";
import { ShoppingCart } from "../components/ShoppingCart";
import {
  CartActionsType,
  CartItem,
  OrderSummary,
  cartReducer,
  cartState,
  initialCartState,
  selectedItem,
} from "../reducers";
import { IMenuData } from "../models/menu.model";
import { getLocalStorageData, setLocalStorageData } from "../utility/utils";

type shoppingCartProviderProps = {
  children: React.ReactNode;
};

export const shoppingCartContext = createContext({} as shoppingCartProps);

export type shoppingCartProps = {
  currentState?: cartState;
  totalPrice: number;
  menus: Partial<CartItem>[];
  quantity: number;
  openCart(): void;
  closeCart(): void;
  increaseMenuQuantity(payload: Partial<CartItem>): void;
  removeMenuFromCart(cartItem: Partial<CartItem>): void;
  AddItemToCart(menuItem?: selectedItem): void;
  removeItemFromCart(menuItem: selectedItem): void;
  getMenuQuantity(id: string): number;
  calculateMenuTotalPriceFromMenuItems(id: string): number | undefined;
  itemPrice(id: string): number | undefined;
  AddMoreMenu(id: string): number | undefined;
  addMenuToCart(menu: IMenuData): void;
  GetOrderSummary(): OrderSummary[] | undefined;
  resetCart(): void;
  getMenus(): Partial<CartItem>[];
  removeMenuFromState(id: string): void;
  GetTotalPrice: () => number;
  IncreaseSelectedItemsInTheCart: (menuId: string) => void;
  DecreaseOrRemoveSelectedItemsInTheCart: (menuId: string, orderSummaryId: string) => void;
};

export const ShoppingCartProvider = ({ children }: shoppingCartProviderProps) => {
  const navigate = useNavigate();
  let [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  let [currentState, setCurrentState] = useState<cartState>(initialCartState);

  useEffect(() => {
    const getSavedState = getLocalStorageData("state", true);
    if (getSavedState) {
      const savedState: cartState = JSON.parse(getSavedState);
      if (Object.keys(savedState)) {
        currentState = savedState;
        setCurrentState(savedState);
      }
    }
  }, []);

  const shoppingCartState = useMemo(() => {
    const openCart = () => {
      setIsOpen(true);
    };
    const closeCart = () => {
      setIsOpen(false);
    };

    const getMenus = () => {
      return state.menus;
    };

    const setLocalState = (state: cartState) => {
      setLocalStorageData("state", JSON.stringify(state), true);
    };

    const AddMoreMenu = (id: string): number | undefined => {
      const menu = state.menus.find((menu) => menu.id === id);
      if (menu) {
        if (menu.selectedItems?.length) {
          const menuPrice = calculateMenuTotalPriceFromMenuItems(id)! * menu.quantity!;
          menu.menuTotalPrice = menuPrice;
        } else {
          menu.menuTotalPrice = menu?.quantity! * menu?.basePrice!;
        }
      }
      setLocalState(state);
      return menu!.menuTotalPrice;
    };

    const increaseMenuQuantity = (payload: CartItem) => {
      let menus: Partial<CartItem>[] = state.menus;

      if (!menus.length) {
        payload.selectedItems = [];
        payload.menuPrice = payload.basePrice;
        state.menus.push(payload);
        console.log(state.menus);
      }

      if (menus.length) {
        const found = menus.find((menu) => menu?.id === payload.id);
        if (!found) {
          state.quantity += 1;
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
      console.log(state);
      setLocalState(state);
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
            menu.menuTotalPrice = menu.menuTotalPrice! - onePortion;
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
      setLocalState(state);
      dispatch({
        type: CartActionsType.REMOVE_MENU_FROM_CART,
      });
    };

    const removeItemFromCart = (menuItem: selectedItem) => {
      let { menus } = state;
      const menu = menus.find((menu) => menu.id === menuItem.menuId);

      if (menu?.menuTotalPrice) {
        let menuItems: selectedItem[] = [];
        for (const menu of menus) {
          if (menu.id === menuItem.menuId) {
            if (menu?.selectedItems && menu.selectedItems.length) {
              menuItems = menu.selectedItems;
            }
          }
        }

        if (menuItems.length) {
          for (const item of menuItems) {
            if (menuItem.id === item.id) {
              if (item.quantity && item.quantity >= 1) {
                item.quantity -= 1;
                if (!menu.quantity) {
                  menu.menuTotalPrice -= item.price;
                } else {
                  menu.menuTotalPrice -= item.price * menu.quantity;
                }
                state.totalPrice = menu.menuTotalPrice;
              } else {
                item.quantity = 0;
              }
            }
          }
        }
        setLocalState(state);
        dispatch({
          type: CartActionsType.REMOVE_ITEM_FROM_CART,
        });
      }
    };

    const calculateMenuTotalPriceFromMenuItems = (id: string): number | undefined => {
      const menu: Partial<CartItem> | undefined = state.menus.find((menu) => menu.id === id);
      let totalPrice: number = 0;
      if (menu) {
        const selectedItems: selectedItem[] = menu.selectedItems ?? [];
        let orderPrice: number = 0;
        if (selectedItems?.length) {
          selectedItems.forEach((item) => {
            orderPrice += item.price * (item.quantity ?? 1);
          });
          totalPrice = menu.menuPrice! + orderPrice;
        }
        setLocalState(state);
        return (menu.menuTotalPrice = totalPrice);
      }
    };

    const itemPrice = (id: string): number | undefined => {
      const menu = state.menus.find((menu) => menu.id === id);
      if (menu) {
        return menu.menuTotalPrice;
      }
    };

    const AddItemToCart = (menuItem?: selectedItem) => {
      if (menuItem) {
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
                selectedItems = menu.selectedItems ?? [];
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
          console.log(state);
        } else {
          if (itemMenu) {
            let selectedItems: selectedItem[] | undefined = itemMenu.selectedItems;
            if (selectedItems?.length) {
              const selectedItem = selectedItems.find((i) => i.id === menuItem.id);
              if (selectedItem) {
                selectedItem.quantity! += 1;
                itemMenu.menuTotalPrice = itemMenu.menuTotalPrice! + selectedItem.price * itemMenu.quantity!;
                state.totalPrice = itemMenu.menuTotalPrice;
              } else {
                menuItem.quantity = 1;
                selectedItems.push(menuItem);
                itemMenu.menuTotalPrice = itemMenu.menuTotalPrice! + menuItem.price * itemMenu.quantity!;
                state.totalPrice = itemMenu.menuTotalPrice;
              }
            } else {
              menuItem.quantity = 1;
              const currentMenu = state.menus.find((menu) => menu.id === itemMenu.id);
              if (currentMenu) {
                if (!currentMenu.selectedItems?.length) {
                  currentMenu.selectedItems = [menuItem];
                }
              }
              itemMenu.menuTotalPrice = itemMenu.menuTotalPrice! + menuItem.price * itemMenu.quantity!;
              state.totalPrice = itemMenu.menuTotalPrice;
            }
          }
        }
      }
      console.log(state);
      dispatch({
        type: CartActionsType.ADD_ITEM_TO_CART,
      });
      setLocalState(state);
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

    const GetTotalPrice = () => {
      return state.totalPrice;
    };

    const addMenuToCart = (menu: IMenuData) => {
      if (!state.menus.length) {
        state.menus = menuToMenuStateMapper(menu);
        state.quantity = 1;
      }
      let { menus, quantity, orderSummary } = state;
      const orderInfo: OrderSummary = {
        id: (Math.floor(Math.random() * 1000000) + 1).toString(),
        menus,
        quantity,
      };
      if (quantity === 0) {
        orderInfo.quantity = 1;
      }
      orderSummary.push(orderInfo);
      state.menus = [];
      state.quantity = 0;
      console.log("currentState", currentState);
      navigate("/");
      setLocalState(state);
      dispatch({
        type: CartActionsType.ADD_MENU_TO_CART,
      });
    };

    const GetOrderSummary = (): OrderSummary[] | undefined => {
      if (state.orderSummary) {
        return state.orderSummary;
      }
      dispatch({
        type: CartActionsType.GET_ORDER_SUMMARY,
      });
    };

    const resetCart = () => {
      state.totalPrice = 0;
      state.quantity = 0;
      state.menus = [];
      state.orderSummary = [];
      dispatch({
        type: CartActionsType.RESET_CART,
      });
      setLocalState(state);
    };

    const removeMenuFromState = (id: string) => {
      const menus = state.menus;
      const index = menus.findIndex((menu) => menu.id === id);
      if (index > -1) {
        menus.splice(index, 1);
      }
      state.quantity = 0;
      state.totalPrice = 0;
      dispatch({
        type: CartActionsType.REMOVE_MENU_FROM_CART_STATE,
      });
      setLocalState(state);
    };

    const IncreaseSelectedItemsInTheCart = (menuId: string) => {
      const orderSummary = GetOrderSummary();
      if (orderSummary?.length) {
        const orderMenus = orderSummary.map((menu) => menu.menus).flat();
        const menu = orderMenus.find((menu) => menu.id === menuId);
        if (menu) {
          menu.quantity = menu.quantity ? (menu.quantity = menu.quantity + 1) : menu.quantity;
        }
      }
      dispatch({
        type: CartActionsType.INCREASE_SELECTED_ITEMS_IN_CART,
      });
      setLocalState(state);
    };

    const DecreaseOrRemoveSelectedItemsInTheCart = (menuId: string, orderSummaryId: string) => {
      const orderSummary = GetOrderSummary();
      if (orderSummary?.length) {
        const orderMenus = orderSummary.map((menu) => menu.menus).flat();
        const menu = orderMenus.find((menu) => menu.id === menuId);
        if (menu) {
          menu.quantity = menu.quantity ? (menu.quantity = menu.quantity - 1) : menu.quantity;
          if (menu.quantity === 0) {
            const index = orderSummary.findIndex((order) => order.id === orderSummaryId);
            if (index > -1) {
              orderSummary.splice(index, 1);
            }
          }
        }
      }
      dispatch({
        type: CartActionsType.DECRESE_OR_REMOVE_SELECTED_ITEMS_FROM_CART,
      });
      setLocalState(state);
    };

    const value: shoppingCartProps = {
      currentState,
      totalPrice: state.totalPrice,
      menus: state.menus,
      quantity: state.quantity,
      increaseMenuQuantity,
      removeMenuFromCart,
      AddItemToCart,
      removeItemFromCart,
      getMenuQuantity,
      openCart,
      closeCart,
      calculateMenuTotalPriceFromMenuItems,
      itemPrice,
      AddMoreMenu,
      addMenuToCart,
      GetOrderSummary,
      resetCart,
      getMenus,
      removeMenuFromState,
      GetTotalPrice,
      IncreaseSelectedItemsInTheCart,
      DecreaseOrRemoveSelectedItemsInTheCart,
    };
    return value;
  }, [state]);

  return (
    <shoppingCartContext.Provider value={shoppingCartState}>
      {children} <ShoppingCart isOpen={isOpen} />
    </shoppingCartContext.Provider>
  );
};
