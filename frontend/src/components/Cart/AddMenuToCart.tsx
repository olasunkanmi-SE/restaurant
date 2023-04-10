import { CSSProperties } from "react";
import { Button, Stack } from "react-bootstrap";
import { QtyButton } from "../MenuItems/addItemButton";

const addToCartStyle: CSSProperties = {
  textAlign: "center",
  marginRight: "10px",
};

type addItemToCart = {
  amount: number;
  quantity: number;
  onAddMenuToCart: (event: React.MouseEvent<HTMLElement>) => void;
  onRemoveMenuFromCart: (event: React.MouseEvent<HTMLElement>) => void;
};

export const AddMenuToCartButton = ({ amount, quantity, onAddMenuToCart, onRemoveMenuFromCart }: addItemToCart) => {
  return (
    <Stack direction="horizontal" gap={3}>
      <div>
        <QtyButton sign={"increment"} onClick={onAddMenuToCart} />
      </div>
      <div>{quantity}</div>
      <div>
        <QtyButton sign={"decrement"} onClick={onRemoveMenuFromCart} />
      </div>
      <div className="ms-auto">
        <div style={addToCartStyle}>
          <Button onClick={onAddMenuToCart} className="w-100 btn btn-success" variant="primary" type="submit">
            ADD TO CART RM {amount}
          </Button>
        </div>
      </div>
    </Stack>
  );
};
