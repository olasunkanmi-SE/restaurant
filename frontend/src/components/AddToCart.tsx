import { CSSProperties } from "react";
import { Button } from "react-bootstrap";

const addToCartStyle: CSSProperties = {
  textAlign: "center",
};

export const AddToCartButton = () => {
  return (
    <div style={addToCartStyle}>
      <Button className="w-100 btn btn-sm btn-success" variant="primary" type="submit">
        Add to Cart
      </Button>
    </div>
  );
};
