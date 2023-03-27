import { useLocation } from "react-router-dom";
import { Checkout } from "./Checkout";
import { AddToCartButton } from "./AddToCart";
import { useShoppingCart } from "../hooks/UseShoppingCart";

export const CheckOutOrAddToCart = () => {
  const { totalPrice } = useShoppingCart();
  const location = useLocation();
  const path = location.pathname.startsWith("/menu/");

  return <>{path ? <AddToCartButton amount={totalPrice} /> : <Checkout />}</>;
};
