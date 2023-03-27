import { createContext, useMemo, useReducer } from "react";
import { CartActionsType, CartItem, cartReducer, cartState, initialCartState } from "../reducers";

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
        payload: cartItem,
      });
    };

    const addToCart = (cartItem: CartItem) => {
      const [qty, price] = addItemToCart(state, cartItem);
      state.quantity = qty;
      state.totalPrice = price;
      dispatch({
        type: CartActionsType.ADD_TO_CART,
        payload: cartItem,
      });
    };

    const value: shoppingCartProps = {
      totalPrice: state.totalPrice,
      cart: state.cart,
      quantity: state.quantity,
      addToCart,
      removeFromCart,
    };
    return value;
  }, [state]);

  return <shoppingCartContext.Provider value={shoppingCartState}>{children}</shoppingCartContext.Provider>;
};
