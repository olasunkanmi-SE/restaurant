import { Stack } from "react-bootstrap";
import { IncrementOrDecrementButton } from "./IncrementOrDecrementButton";

type foodItem = {
  name: string;
  price: number;
};

export const FoodItemList = ({ name, price }: foodItem) => {
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <IncrementOrDecrementButton sign={"increment"} />
        <div>{name}</div>
        <div className=" ms-auto">+RM {price}</div>
        <div>x0</div>
        <IncrementOrDecrementButton sign={"decrement"} />
      </Stack>
      <hr></hr>
    </>
  );
};
