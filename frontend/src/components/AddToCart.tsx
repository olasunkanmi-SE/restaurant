import { CSSProperties } from "react";
import { Button, Stack } from "react-bootstrap";
import { QtyButton } from "./addItemButton";

const addToCartStyle: CSSProperties = {
  textAlign: "center",
};

type addItemToCart = {
  amount: number;
  onAddMenuToCartClick: (event: React.MouseEvent<HTMLElement>) => void;
  onAddItemToCartClick: (event: React.MouseEvent<HTMLElement>) => void;
  onRemoveItemFromCartClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export const AddToCartButton = ({
  amount,
  onAddMenuToCartClick,
  onAddItemToCartClick,
  onRemoveItemFromCartClick,
}: addItemToCart) => {
  return (
    <Stack direction="horizontal" gap={3}>
      <div>
        <QtyButton sign={"increment"} onClick={onAddItemToCartClick} />
      </div>
      <div>1</div>
      <div>
        <QtyButton sign={"decrement"} onClick={onRemoveItemFromCartClick} />
      </div>
      <div className="ms-auto">
        <div style={addToCartStyle}>
          <Button onClick={onAddMenuToCartClick} className="w-100 btn btn-success" variant="primary" type="submit">
            ADD TO CART RM {amount}
          </Button>
        </div>
      </div>
    </Stack>
  );
};
