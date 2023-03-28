import { CSSProperties } from "react";
import { Button } from "react-bootstrap";

const addToCartStyle: CSSProperties = {
  textAlign: "center",
};

type totalAmount = {
  amount: number;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export const AddToCartButton = ({ amount, onClick }: totalAmount) => {
  return (
    <div style={addToCartStyle}>
      <Button onClick={onClick} className="w-100 btn btn-success" variant="primary" type="submit">
        ADD TO CART RM {amount}
      </Button>
    </div>
  );
};
