import { CSSProperties } from "react";
import { Stack } from "react-bootstrap";
import { useShoppingCart } from "../../hooks/UseShoppingCart";

const checkoutStyle: CSSProperties = {
  zIndex: 9999,
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  overflow: "hidden",
  color: "#FFF",
  height: "40px",
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
  const { quantity, totalPrice } = useShoppingCart();
  return (
    <div style={checkoutStyle}>
      <Stack className="mt-2" direction="horizontal" gap={3}>
        <div>Checkout</div>
        <div className="ms-auto">RM {totalPrice}</div>
        <div className="ms-auto" style={cartItemsCount}>
          {quantity}
        </div>
      </Stack>
    </div>
    // <div style={checkoutStyle} className="d-flex justify-content-between">
    //   <div style={{ marginLeft: "11px" }}>Checkout</div>
    //   <div style={cartItemsCount}>{quantity}</div>
    // </div>
  );
};
