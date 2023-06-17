import { CSSProperties } from "react";
import { Button, Stack } from "react-bootstrap";
import { QtyButton } from "../MenuItems/addItemButton";
import { useShoppingCart } from "../../hooks/UseShoppingCart";

const addToCartStyle: CSSProperties = {
  textAlign: "center",
  marginRight: "10px",
};

type AddItemToCart = {
  amount: number;
  onAddMenuToCart: (event: React.MouseEvent<HTMLElement>) => void;
  onAddItemToCart: (event: React.MouseEvent<HTMLElement>) => void;
  onRemoveItemFromCart: (event: React.MouseEvent<HTMLElement>) => void;
};

export const AddToCartButton = ({ amount, onAddMenuToCart, onAddItemToCart, onRemoveItemFromCart }: AddItemToCart) => {
  const { quantity } = useShoppingCart();
  return (
    <Stack direction="horizontal" gap={3}>
      <div>
        <QtyButton sign={"increment"} onClick={onAddItemToCart} />
      </div>
      <div>{quantity}</div>
      <div>
        <QtyButton sign={"decrement"} onClick={onRemoveItemFromCart} />
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
