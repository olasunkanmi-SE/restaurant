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

export const Checkout = () => {
  const { quantity, totalPrice } = useShoppingCart();
  return (
    <div style={checkoutStyle}>
      <Stack className="mt-2" direction="horizontal" gap={3}>
        <div>Checkout</div>
        <div style={{ marginRight: "10px" }} className="ms-auto">
          Total: RM {totalPrice}
        </div>
      </Stack>
    </div>
  );
};
