import { CSSProperties } from "react";
import { Button, Stack } from "react-bootstrap";
import { QtyButton } from "./addItemButton";

const addToCartStyle: CSSProperties = {
  textAlign: "center",
};

type totalAmount = {
  amount: number;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export const AddToCartButton = ({ amount, onClick }: totalAmount) => {
  return (
    <Stack direction="horizontal" gap={3}>
      <div>
        <QtyButton sign={"increment"} onClick={onClick} />
      </div>
      <div>1</div>
      <div>
        <QtyButton sign={"decrement"} onClick={onClick} />
      </div>
      <div className="ms-auto">
        <div style={addToCartStyle}>
          <Button onClick={onClick} className="w-100 btn btn-success" variant="primary" type="submit">
            ADD TO CART RM {amount}
          </Button>
        </div>
      </div>
    </Stack>
  );
};
