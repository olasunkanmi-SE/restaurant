import { useContext } from "react";
import { shoppingCartContext } from "../contexts";
import { cartReducer } from "../reducers";

type useShoppingCartContextType = ReturnType<typeof cartReducer>;

export const useShoppingCart = (): useShoppingCartContextType => {
  return useContext(shoppingCartContext);
};
