import { CSSProperties } from "react";
import { Stack } from "react-bootstrap";
import { calculateTotalOrderAmount } from "../../utility/utils";

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
  fontWeight: 700,
};

export const Checkout = () => {
  return (
    <div style={checkoutStyle}>
      <Stack className="mt-2" direction="horizontal" gap={3}>
        <div>Checkout</div>
        <div style={{ marginRight: "10px" }} className="ms-auto">
          Total: RM {calculateTotalOrderAmount()}
        </div>
      </Stack>
    </div>
  );
};
