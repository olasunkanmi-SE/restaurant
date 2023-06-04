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
  disableQuatityButton: boolean;
  disableAddToCartButton: boolean;
};

export const AddMenuToCartButton = ({
  id,
  quantity,
  onRemoveMenuFromCart,
  basePrice,
  handleInCreaseQty,
  disableQuatityButton,
  disableAddToCartButton,
}: addItemToCart) => {
  const { itemPrice, addMenuToCart } = useShoppingCart();
  const HandleAddMenuToCart = () => {
    return addMenuToCart();
  };
  return (
    <Stack direction="horizontal" gap={3}>
      <div>
        <QtyButton disabled={disableQuatityButton} sign={"increment"} onClick={handleInCreaseQty} />
      </div>
      <div>{quantity === 0 ? 1 : quantity}</div>
      <div>
        <QtyButton disabled={disableQuatityButton} sign={"decrement"} onClick={onRemoveMenuFromCart} />
      </div>
      <div className="ms-auto">
        <div style={addToCartStyle}>
          <Button
            disabled={disableAddToCartButton}
            onClick={HandleAddMenuToCart}
            className="w-100 btn btn-success"
            variant="primary"
            type="button"
          >
            ADD TO CART RM {itemPrice(id) === undefined ? basePrice : itemPrice(id)}
          </Button>
        </div>
      </div>
    </Stack>
  );
};
