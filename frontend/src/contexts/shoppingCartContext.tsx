import { createContext, useMemo, useReducer } from "react";
import { CartActionsType, CartItem, Item, cartReducer, cartState, initialCartState } from "../reducers";

type shoppingCartProviderProps = {
  children: React.ReactNode;
};

export const shoppingCartContext = createContext({} as shoppingCartProps);

export type shoppingCartProps = {
  totalPrice: number;
  menus: CartItem[];
  quantity: number;
  addToCart(cartItem: CartItem): void;
  removeFromCart(cartItem: CartItem): void;
  addItemToCart(menuItem: Item): void;
};

export const ShoppingCartProvider = ({ children }: shoppingCartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addMenuToCart = (state: cartState, payload: CartItem): [quantity: number, price: number] => {
    let qty: number = state.quantity;
    let price: number = state.totalPrice;
    let menus: CartItem[] = state.menus;

    if (!state.menus.length) {
      qty = state.quantity + 1;
      price = payload.basePrice;
    }

    if (state.menus.length) {
      const index = menus.findIndex((menu) => menu.id === payload.id);
      if (index === -1) {
        state.menus = [...state.menus, payload];
      }
      price += payload.basePrice;
      qty = state.quantity + 1;
    } else {
      state.menus = [payload];
    }
    console.log(state);
    return [qty, price];
  };

  const shoppingCartState = useMemo(() => {
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

    const addItemToCart = (menuItem: Item) => {
      let distinctMenu = new Set<CartItem>();
      let { menus } = state;
      if (menus.length) {
        const itemMenuMap = new Map<string, Item[] | []>();

        menus.forEach((menu) => {
          itemMenuMap.set(menu.id, menu.items ? menu.items : []);
        });

        menus.forEach((item) => {
          distinctMenu.add(item);
        });

        const updatedMenu = Array.from(distinctMenu);
        state.menus = updatedMenu;

        updatedMenu.forEach((d) => {
          if (itemMenuMap.has(d.id)) {
            const items = itemMenuMap.get(d.id);
            items?.map((item) => {
              if (menuItem.id === item.id) {
                let { totalPrice } = state;
                if (totalPrice !== 0) {
                  state.totalPrice += menuItem.price;
                  state.itemQuantity = state.itemQuantity + 1;
                  state.items.push(item);
                  state.items = Array.from(new Set<Item>(state.items));
                } else {
                  state.totalPrice = menuItem.price;
                  state.itemQuantity = 1;
                  state.items.push(item);
                }
              }
            });
          }
        });
        console.log(state);
      }
      dispatch({
        type: CartActionsType.ADD_ITEM_TO_CART,
      });
    };

    const addToCart = (menuItem: CartItem) => {
      const [qty, price] = addMenuToCart(state, menuItem);
      state.quantity = qty;
      state.totalPrice = price;
      dispatch({
        type: CartActionsType.ADD_TO_CART,
      });
    };

    const value: shoppingCartProps = {
      totalPrice: state.totalPrice,
      menus: state.menus,
      quantity: state.quantity,
      addToCart,
      removeFromCart,
      addItemToCart,
    };
    return value;
  }, [state]);

  return <shoppingCartContext.Provider value={shoppingCartState}>{children}</shoppingCartContext.Provider>;
};
