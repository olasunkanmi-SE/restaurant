import { Stack } from "react-bootstrap";
import { useShoppingCart } from "../hooks/UseShoppingCart";
import { storeItemProps } from "./StoreItem";
import { QtyButton } from "./addItemButton";

type foodItem = storeItemProps & { itemId: string; itemPrice: number };
export const FoodItemList = ({ name, itemId, itemPrice, id, basePrice }: foodItem) => {
  const { addItemToCart } = useShoppingCart();
  const handleClick = () => {
    return addItemToCart({
      id: itemId,
      name,
      price: itemPrice,
      menuId: id,
      menuPrice: basePrice,
    });
  };
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <QtyButton sign={"increment"} onClick={handleClick} />
        <div>{name}</div>
        <div className=" ms-auto"> +RM {itemPrice}</div>
        <div>x0</div>
        <QtyButton sign={"decrement"} onClick={handleClick} />
      </Stack>
      <hr></hr>
    </>
  );
};
