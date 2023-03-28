import { useContext } from "react";
import { shoppingCartContext, shoppingCartProps } from "../contexts";

export const useShoppingCart = (): shoppingCartProps => {
  return useContext(shoppingCartContext);
};
