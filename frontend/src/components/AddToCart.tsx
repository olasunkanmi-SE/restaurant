import { CSSProperties } from "react";
import { Button } from "react-bootstrap";

const addToCartStyle: CSSProperties = {
  textAlign: "center",
};

type totalAmount = {
  amount: number;
};

export const AddToCartButton = ({ amount }: totalAmount) => {
  return (
    <div style={addToCartStyle}>
      <Button className="w-100 btn btn-success" variant="primary" type="submit">
        ADD TO CART RM{amount}
      </Button>
    </div>
  );
};
