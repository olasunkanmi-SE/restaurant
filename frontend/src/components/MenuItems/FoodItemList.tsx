import { Stack } from "react-bootstrap";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { QtyButton } from "./addItemButton";
import { storeItemProps } from "./StoreItem";

type foodItem = storeItemProps & { itemId: string; itemPrice: number };

export const FoodItemList = ({ name, itemId, itemPrice, id, basePrice }: Omit<foodItem, "items">) => {
  const { addItemToCart, menus } = useShoppingCart();
  let itemQty: number = 0;
  const handleClick = () => {
    return addItemToCart({
      id: itemId,
      name,
      price: itemPrice,
      menuId: id,
      menuPrice: basePrice,
    });
  };
  if (menus && menus.length) {
    const selectedItems = menus.map((menu) => menu.selectedItems || []);
    const flattenedSelectedItems = selectedItems.flat();
    flattenedSelectedItems.forEach((item) => {
      if (item.id === itemId) {
        itemQty = item.quantity!;
      }
    });
  }
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <QtyButton sign={"increment"} onClick={handleClick} />
        <div>{name}</div>
        <div className=" ms-auto"> +RM {itemPrice}</div>
        <div>x {itemQty}</div>
        <QtyButton sign={"decrement"} onClick={handleClick} />
      </Stack>
      <hr></hr>
    </>
  );
};
