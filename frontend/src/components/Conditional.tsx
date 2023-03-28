import { useLocation } from "react-router-dom";
import { Checkout } from "./Checkout";
import { Fragment } from "react";

type totalAmount = {
  amount: number;
};

export const CheckOutOrAddToCart = ({ amount }: totalAmount) => {
  const location = useLocation();
  const path = location.pathname.startsWith("/menu/");

  return <>{path ? <Fragment /> : <Checkout />}</>;
};
