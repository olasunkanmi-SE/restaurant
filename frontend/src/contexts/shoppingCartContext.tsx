import { createContext, useContext, useReducer } from "react";
import { CartActionsType, CartItem, cartReducer, cartState, initialCartState } from "../reducers";

type shoppingCartProviderProps = {
  children: React.ReactNode;
};

const shoppingCartContext: React.Context<cartState> = createContext(initialCartState);

export const useShoppingCart = () => {
  return useContext(shoppingCartContext);
};

type shoppingCartProps = {
  totalPrice: number;
  cart: CartItem[];
  quantity: number;
  addToCart(cartItem: CartItem): void;
  // removeFromCart: CartItem[] | [];
};

export const ShoppingCartProvider = ({ children }: shoppingCartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const addToCart = (cartItem: CartItem) => {
    const { id, name, basePrice, quantity, addons } = cartItem;
    dispatch({
      type: CartActionsType.ADD_TO_CART,
      payload: { id, name, basePrice, quantity, addons },
    });
  };
  // const removeFromCart = (): CartItem[] | [] => {};
  const value: shoppingCartProps = {
    totalPrice: state.totalPrice,
    cart: state.cart,
    quantity: state.quantity,
    addToCart,
    // removeFromCart,
  };
  return <shoppingCartContext.Provider value={value}>{children}</shoppingCartContext.Provider>;
};
