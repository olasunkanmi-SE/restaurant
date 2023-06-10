import { Stack } from "react-bootstrap";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { storeItemProps } from "./StoreItem";
import { QtyButton } from "./addItemButton";
import { v4 as uuidv4 } from "uuid";

type foodItem = storeItemProps & {
  itemId: string;
  itemPrice: number;
  handleUnCheck: () => void;
  enableAddToCartBtns: () => void;
  menuName: string;
};

export const FoodItemList = ({
  name,
  itemId,
  itemPrice,
  menuName,
  id,
  basePrice,
  handleUnCheck,
  enableAddToCartBtns,
}: Omit<foodItem, "items" | "handleCheck" | "isChecked">) => {
  const { AddItemToCart, menus, removeItemFromCart } = useShoppingCart();
  let itemQty: number = 0;
  const handleAddItemToCart = () => {
    enableAddToCartBtns();
    handleUnCheck();
    return AddItemToCart({
      selectedItemId: uuidv4(),
      id: itemId,
      menuName: menuName,
      name,
      price: itemPrice,
      menuId: id,
      menuPrice: basePrice,
    });
  };
  const handleRemoveItemFromCart = () => {
    return removeItemFromCart({
      selectedItemId: uuidv4(),
      id: itemId,
      name,
      price: itemPrice,
      menuId: id,
      menuPrice: basePrice,
    });
  };
  if (menus?.length) {
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
        <QtyButton sign={"decrement"} onClick={handleRemoveItemFromCart} />
        <div>{name}</div>
        <div className=" ms-auto"> +RM {itemPrice}</div>
        <div>x {itemQty}</div>
        <QtyButton sign={"increment"} onClick={handleAddItemToCart} />
      </Stack>
      <hr></hr>
    </>
  );
};
