import { CSSProperties } from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { QtyButton } from "../MenuItems/addItemButton";

const addToCartStyle: CSSProperties = {
  textAlign: "center",
  marginRight: "10px",
};

type AddItemToCart = {
  basePrice: number;
  id: string;
  amount: number;
  quantity: number;
  onAddMenuToCart: (event: React.MouseEvent<HTMLElement>) => void;
  onRemoveMenuFromCart: (event: React.MouseEvent<HTMLElement>) => void;
  handleInCreaseQty: (event: React.MouseEvent<HTMLElement>) => void;
  disableQuatityButton: boolean;
  disableAddToCartButton: boolean;
  addToCart: (event: React.MouseEvent<HTMLElement>) => void;
};

export const AddMenuToCartButton = ({
  id,
  quantity,
  onRemoveMenuFromCart,
  basePrice,
  handleInCreaseQty,
  disableQuatityButton,
  disableAddToCartButton,
  addToCart,
}: AddItemToCart) => {
  const { itemPrice } = useShoppingCart();
  return (
    <Stack direction="horizontal" gap={3}>
      <div>
        <QtyButton disabled={disableQuatityButton} sign={"decrement"} onClick={onRemoveMenuFromCart} />
      </div>
      <div>{quantity === 0 ? 1 : quantity}</div>
      <div>
        <QtyButton disabled={disableQuatityButton} sign={"increment"} onClick={handleInCreaseQty} />
      </div>
      <div className="ms-auto">
        <div style={addToCartStyle}>
          <Button
            disabled={disableAddToCartButton}
            onClick={addToCart}
            className="w-100 btn btn-success"
            variant="primary"
            type="button"
          >
            ADD TO CART RM {itemPrice(id) ?? basePrice}
          </Button>
        </div>
      </div>
    </Stack>
  );
};
