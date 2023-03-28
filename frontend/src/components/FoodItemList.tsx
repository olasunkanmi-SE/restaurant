import { Stack } from "react-bootstrap";
import { IncrementOrDecrementButton } from "./IncrementOrDecrementButton";
import { useShoppingCart } from "../hooks/UseShoppingCart";
import { storeItemProps } from "./StoreItem";

type foodItem = storeItemProps & { itemId: string; itemPrice: number };

export const FoodItemList = ({ id, name, description, basePrice, items, itemId, itemPrice, quantity }: foodItem) => {
  const { addItemToCart } = useShoppingCart();
  const handleClick = () => {
    return addItemToCart({ id: itemId, name, price: itemPrice });
  };
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <IncrementOrDecrementButton children onClick={handleClick} sign={"increment"} />
        <div>{name}</div>
        <div className=" ms-auto"> +RM {itemPrice}</div>
        <div>x0</div>
        <IncrementOrDecrementButton children onClick={handleClick} sign={"decrement"} />
      </Stack>
      <hr></hr>
    </>
  );
};
