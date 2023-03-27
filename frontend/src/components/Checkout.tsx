import { CSSProperties } from "react";
import { useShoppingCart } from "../hooks/UseShoppingCart";

const checkoutStyle: CSSProperties = {
  zIndex: 9999,
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  overflow: "hidden",
  color: "#FFF",
  height: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#000000",
};
const cartItemsCount: CSSProperties = {
  color: "#000",
  width: "1.5rem",
  height: "1.5rem",
  bottom: "0px",
  right: "0px",
  backgroundColor: "#fff",
  textAlign: "center",
  marginRight: "11px",
  fontWeight: 600,
  borderRadius: "10px",
};

export const Checkout = () => {
  const { quantity } = useShoppingCart();
  return (
    <div style={checkoutStyle} className="d-flex justify-content-between">
      <div style={{ marginLeft: "11px" }}>Checkout</div>
      <div style={cartItemsCount}>{quantity}</div>
    </div>
  );
};
