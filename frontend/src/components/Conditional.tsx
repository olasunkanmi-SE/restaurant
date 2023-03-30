import { useLocation } from "react-router-dom";
import { Checkout } from "./Checkout";
import { Fragment } from "react";

export const CheckOutOrAddToCart = () => {
  const location = useLocation();
  const path = location.pathname.startsWith("/menu/");

  return <>{path ? <Fragment /> : <Checkout />}</>;
};
