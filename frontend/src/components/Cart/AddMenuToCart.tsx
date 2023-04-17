import { CSSProperties } from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { QtyButton } from "../MenuItems/addItemButton";

const addToCartStyle: CSSProperties = {
  textAlign: "center",
  marginRight: "10px",
};

type addItemToCart = {
  basePrice: number;
  id: string;
  amount: number;
  quantity: number;
  onAddMenuToCart: (event: React.MouseEvent<HTMLElement>) => void;
  onRemoveMenuFromCart: (event: React.MouseEvent<HTMLElement>) => void;
  handleInCreaseQty: (event: React.MouseEvent<HTMLElement>) => void;
};

export const AddMenuToCartButton = ({
  id,
  quantity,
  onAddMenuToCart,
  onRemoveMenuFromCart,
  basePrice,
  handleInCreaseQty,
}: addItemToCart) => {
  const { itemPrice } = useShoppingCart();
  return (
    <Stack direction="horizontal" gap={3}>
      <div>
        <QtyButton sign={"increment"} onClick={handleInCreaseQty} />
      </div>
      <div>{quantity === 0 ? 1 : quantity}</div>
      <div>
        <QtyButton sign={"decrement"} onClick={onRemoveMenuFromCart} />
      </div>
      <div className="ms-auto">
        <div style={addToCartStyle}>
          <Button onClick={onAddMenuToCart} className="w-100 btn btn-success" variant="primary" type="submit">
            ADD TO CART RM {itemPrice() === 0 ? basePrice : itemPrice()}
          </Button>
        </div>
      </div>
    </Stack>
  );
};
