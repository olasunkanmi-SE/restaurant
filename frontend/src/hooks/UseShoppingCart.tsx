import { useContext } from "react";
import { shoppingCartContext } from "../contexts";
import { shoppingCartProps } from "../contexts/shoppingCartTypes";

export const useShoppingCart = (): shoppingCartProps => {
  return useContext(shoppingCartContext);
};
