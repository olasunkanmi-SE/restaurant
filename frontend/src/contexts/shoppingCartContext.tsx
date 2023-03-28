import { createContext, useMemo, useReducer } from "react";
import { CartActionsType, CartItem, Item, cartReducer, cartState, initialCartState } from "../reducers";

type shoppingCartProviderProps = {
  children: React.ReactNode;
};

export const shoppingCartContext = createContext({} as shoppingCartProps);

export type shoppingCartProps = {
  totalPrice: number;
  cart: CartItem[];
  quantity: number;
  addToCart(cartItem: CartItem): void;
  removeFromCart(cartItem: CartItem): void;
  addItemToMenu(menuItem: Item, cartItem: CartItem): void;
};

export const ShoppingCartProvider = ({ children }: shoppingCartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addItemToCart = (state: cartState, payload: CartItem): [quantity: number, price: number] => {
    let qty: number = state.quantity;
    let price: number = state.totalPrice;

    if (!state.cart.length) {
      qty = state.quantity + 1;
      price = payload.basePrice;
    }

    if (state.cart.length) {
      price += payload.basePrice;
      qty = state.quantity + 1;
    }
    console.log(state);
    return [qty, price];
  };

  const shoppingCartState = useMemo(() => {
    const removeFromCart = (cartItem: CartItem) => {
      const cartIndex = state.cart.findIndex((c) => c.id === cartItem.id);
      if (cartIndex > -1) {
        state.cart.splice(cartIndex, 1);
        if (state.quantity && state.totalPrice !== 0) {
          state.quantity -= 1;
          state.totalPrice -= cartItem.basePrice;
        }
      }
      dispatch({
        type: CartActionsType.REMOVE_FROM_CART,
        menuPayload: cartItem,
        itemPayload: state.cart,
      });
    };

    const addItemToMenu = (menuItem: Item, cartItem: CartItem) => {
      const { cart } = state;
      let items: Item[] = [];
      if (cart.length) {
        const itemMenuMap = new Map<string, Item[] | []>();
        const itemMap = new Map<string, Item>();

        cart.forEach((cart) => {
          itemMenuMap.set(cart.id, cart.items ? cart.items : []);
        });

        cart.forEach((c) => {
          if (itemMenuMap.has(c.id)) {
            items = itemMenuMap.get(c.id)!;
          }
        });

        if (items.length) {
          items.forEach((item) => {
            itemMap.set(item.id, item);
          });
        }

        cart.forEach((c) => {
          if (itemMenuMap.has(c.id) && itemMenuMap.get(c.id)) {
            const items = itemMenuMap.get(c.id);
            items?.map((item) => {
              if (itemMap.has(item.id)) {
                let { quantity, totalPrice } = state;
                if (totalPrice !== 0) {
                  totalPrice += menuItem.price;
                  quantity = quantity ? (quantity += 1) : 1;
                } else {
                  totalPrice = menuItem.price;
                  quantity = quantity ? (quantity += 1) : 1;
                }
              }
            });
          }
        });
        console.log(state);
      }
      dispatch({
        type: CartActionsType.ADD_ITEM_TO_CART,
        itemPayload: cart,
        menuPayload: cartItem,
      });
    };

    const addToCart = (cartItem: CartItem) => {
      const [qty, price] = addItemToCart(state, cartItem);
      state.quantity = qty;
      state.totalPrice = price;
      dispatch({
        type: CartActionsType.ADD_TO_CART,
        menuPayload: cartItem,
        itemPayload: state.cart,
      });
    };

    const value: shoppingCartProps = {
      totalPrice: state.totalPrice,
      cart: state.cart,
      quantity: state.quantity,
      addToCart,
      removeFromCart,
      addItemToMenu,
    };
    return value;
  }, [state]);

  return <shoppingCartContext.Provider value={shoppingCartState}>{children}</shoppingCartContext.Provider>;
};
