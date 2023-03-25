import { useLocation } from "react-router-dom";
import { Checkout } from "./Checkout";
import { AddToCartButton } from "./AddToCart";

type totalAmount = {
  amount: number;
};

export const CheckOutOrAddToCart = ({ amount }: totalAmount) => {
  const location = useLocation();
  const path = location.pathname.startsWith("/menu/");

  return <>{path ? <AddToCartButton amount={amount} /> : <Checkout />}</>;
};
