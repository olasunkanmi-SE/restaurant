import { nanoid } from "nanoid";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { menuToMenuStateMapper, selectedItemToMenuMapper } from "../application/mappers/MenuItem.mapper";
import { ShoppingCart } from "../components/Cart/ShoppingCart";
import { IMenuData } from "../models/menu.model";
import { CartActionsType, CartItem, OrderSummary, cartReducer, initialCartState, SelectedItem } from "../reducers";
import { cartExpiry, getLocalStorageData, removeLocalStorageItem, setLocalStorageData } from "../utility/utils";
import { shoppingCartProps, shoppingCartProviderProps } from "./shoppingCartTypes";

export const shoppingCartContext = createContext({} as shoppingCartProps);

/**
 *Shopping cart provider
 *
 * @exports
 * @function ShoppingCartProvider
 * @implements {shoppingCartProviderProps}
 */

export const ShoppingCartProvider = ({ children }: shoppingCartProviderProps) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const cartExpiryDate = getLocalStorageData("expiry", true);
    const storedCart = getLocalStorageData("cart", true);
    if (storedCart) {
      if (cartExpiryDate && cartExpiry(cartExpiryDate)) {
        removeLocalStorageItem("cart");
        removeLocalStorageItem("expiry");
      }
      dispatch({ type: CartActionsType.LOAD_CART, payload: JSON.parse(storedCart) });
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

    const AddMoreMenu = (id: string): number | undefined => {
      const menu = state.menus.find((menu) => menu.id === id);
      if (menu) {
        if (menu?.selectedItems?.length) {
          const menuPrice = calculateMenuTotalPriceFromMenuItems(id)! * menu.quantity!;
          menu.menuTotalPrice = menuPrice;
        } else {
          menu.menuTotalPrice = menu?.quantity! * menu?.basePrice!;
        }
      }
      setLocalStorageData("cart", JSON.stringify(state), true);
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
      setLocalStorageData("cart", JSON.stringify(state), true);
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
      setLocalStorageData("cart", JSON.stringify(state), true);
      dispatch({
        type: CartActionsType.REMOVE_MENU_FROM_CART,
      });
    };

    const removeItemFromCart = (menuItem: SelectedItem) => {
      let { menus } = state;
      const menu = menus.find((menu) => menu.id === menuItem.menuId);

      if (menu?.menuTotalPrice) {
        let menuItems: SelectedItem[] = [];
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
        setLocalStorageData("cart", JSON.stringify(state), true);
        dispatch({
          type: CartActionsType.REMOVE_ITEM_FROM_CART,
        });
      }
    };

    const calculateMenuTotalPriceFromMenuItems = (id: string): number | undefined => {
      const menu: Partial<CartItem> | undefined = state.menus.find((menu) => menu.id === id);
      let totalPrice: number = 0;
      if (menu) {
        const selectedItems: SelectedItem[] = menu.selectedItems ?? [];
        let orderPrice: number = 0;
        if (selectedItems?.length) {
          selectedItems.forEach((item) => {
            orderPrice += item.price * (item.quantity ?? 1);
          });
          totalPrice = menu.menuPrice! + orderPrice;
        }
        setLocalStorageData("cart", JSON.stringify(state), true);
        return (menu.menuTotalPrice = totalPrice);
      }
    };

    const itemPrice = (id: string): number | undefined => {
      const menu = state.menus.find((menu) => menu.id === id);
      if (menu) {
        return menu.menuTotalPrice;
      }
    };

    const IncreaseShoppingCartSelectedItem = (item: SelectedItem, increase: boolean) => {
      const orderSummary = GetOrderSummary();
      if (orderSummary) {
        const selectedMenu: OrderSummary | undefined = orderSummary.find((order) => order.menus[0].id === item.menuId);
        const currentMenu = selectedMenu?.menus[0];
        if (currentMenu?.selectedItems?.length) {
          const selectedItems = currentMenu.selectedItems;
          const selecteditem = selectedItems.find((currentItem) => currentItem.id === item.id);
          if (selecteditem) {
            if (increase) {
              selecteditem.quantity! += 1;
            } else {
              selecteditem.quantity! -= 1;
              if (selecteditem.quantity! < 1) {
                const index = selectedItems.findIndex((currentItem) => currentItem.id === item.id);
                if (index > -1) {
                  selectedItems.splice(index, 1);
                }
              }
            }
          }
        }
      }
      setLocalStorageData("cart", JSON.stringify(state), true);
      console.log(state.orderSummary);
    };

    const addSelectedItemInstruction = (selectedItem: SelectedItem, instruction: string) => {
      const { menus } = state;
      if (menus.length) {
        const selectedItemMenu = menus.find((menu) => menu.id === selectedItem.menuId);
        if (selectedItemMenu) {
          const selectedItems = selectedItemMenu.selectedItems;
          if (selectedItems?.length) {
            const item = selectedItems.find((item) => item.id === selectedItem.id);
            if (item) {
              item.note = instruction;
            }
          }
        }
      }
    };

    const AddItemToCart = (menuItem?: SelectedItem) => {
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
          let selectedItems: SelectedItem[] | undefined = [];
          const selectedItemMap = new Map<string, SelectedItem>();

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
          console.log(menuItem);
          calculateMenuTotalPriceFromMenuItems(menuItem.menuId);
        }
      }
      setLocalStorageData("expiry", new Date().toISOString(), true);
      setLocalStorageData("cart", JSON.stringify(state), true);
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

    const GetTotalPrice = () => {
      return state.totalPrice;
    };

    const UpdateMenuImageURL = (
      menus: Partial<
        CartItem & {
          menuName: string | undefined;
        }
      >[],
      menu: IMenuData
    ) => {
      for (const stateMenu of menus) {
        if (stateMenu.id === menu.id) {
          stateMenu.imageUrl = menu.imageUrl;
        }
      }
    };

    const addMenuToCart = (menu: IMenuData, instructions?: string) => {
      if (!state.menus.length) {
        state.menus = menuToMenuStateMapper(menu);
        state.quantity = 1;
      }
      let { menus, quantity, orderSummary } = state;
      if (instructions?.length) {
        menus[0].note = instructions;
      }
      UpdateMenuImageURL(menus, menu);
      const orderInfo: OrderSummary = {
        id: nanoid(),
        menus,
        quantity,
      };
      if (quantity === 0) {
        orderInfo.quantity = 1;
      }
      orderSummary.push(orderInfo);
      state.menus = [];
      state.quantity = 0;
      console.log(state);
      navigate("/");
      setLocalStorageData("cart", JSON.stringify(state), true);
      dispatch({
        type: CartActionsType.ADD_MENU_TO_CART,
      });
    };

    const GetOrderSummary = (): OrderSummary[] | undefined => {
      if (state.orderSummary) {
        return state.orderSummary;
      }
    };

    const resetCart = () => {
      state.totalPrice = 0;
      state.quantity = 0;
      state.menus = [];
      state.orderSummary = [];
      setLocalStorageData("cart", JSON.stringify(state), true);
      dispatch({
        type: CartActionsType.RESET_CART,
      });
    };

    const resetMenu = () => {
      state.menus = [];
      setLocalStorageData("cart", JSON.stringify(state), true);
      dispatch({
        type: CartActionsType.RESET_MENU,
      });
    };

    const removeMenuFromState = (id: string) => {
      const menus = state.menus;
      const index = menus.findIndex((menu) => menu.id === id);
      if (index > -1) {
        menus.splice(index, 1);
      }
      state.quantity = 0;
      state.totalPrice = 0;
      setLocalStorageData("cart", JSON.stringify(state), true);
      dispatch({
        type: CartActionsType.REMOVE_MENU_FROM_CART_STATE,
      });
    };

    const RecreateStateFromMenu = (orderMenus: Partial<CartItem>[]) => {
      let { menus, orderSummary } = state;
      menus = orderMenus;
      orderSummary = GetOrderSummary() ?? [];
      const payload = { menus, orderSummary, quantity: 0, totalPrice: 0 };
      dispatch({ type: CartActionsType.LOAD_CART, payload });
      setLocalStorageData("cart", JSON.stringify(payload), true);
      closeCart();
      navigate(`/menu/${orderMenus[0].id}`);
    };

    const updateCartItems = (orderSummary: OrderSummary[]) => {
      state.orderSummary = orderSummary;
      console.log(state.orderSummary);
      setLocalStorageData("cart", JSON.stringify(state), true);
      dispatch({
        type: CartActionsType.UPDATE_CART_ITEMS,
      });
    };

    const value: shoppingCartProps = {
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
      IncreaseShoppingCartSelectedItem,
      updateCartItems,
      RecreateStateFromMenu,
      UpdateMenuImageURL,
      addSelectedItemInstruction,
      resetMenu,
    };
    return value;
  }, [state]);

  return (
    <shoppingCartContext.Provider value={shoppingCartState}>
      {children} <ShoppingCart isOpen={isOpen} />
    </shoppingCartContext.Provider>
  );
};
