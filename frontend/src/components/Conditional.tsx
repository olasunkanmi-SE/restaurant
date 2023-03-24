import { useLocation } from "react-router-dom";
import { Checkout } from "./Checkout";
import { AddToCartButton } from "./AddToCart";

export const CheckOutOrAddToCart = () => {
  const location = useLocation();
  const path = location.pathname.startsWith("/menu/");

  return <>{path ? <AddToCartButton /> : <Checkout />}</>;
};
