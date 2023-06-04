import { Stack } from "react-bootstrap";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { storeItemProps } from "./StoreItem";
import { QtyButton } from "./addItemButton";

type foodItem = storeItemProps & {
  itemId: string;
  itemPrice: number;
  handleUnCheck: () => void;
  enableAddToCartBtns: () => void;
};

export const FoodItemList = ({
  name,
  itemId,
  itemPrice,
  id,
  basePrice,
  handleUnCheck,
  enableAddToCartBtns,
}: Omit<foodItem, "items" | "handleCheck" | "isChecked">) => {
  const { addItemToCart, menus, removeItemFromCart } = useShoppingCart();
  let itemQty: number = 0;
  const handleAddItemToCart = () => {
    enableAddToCartBtns();
    handleUnCheck();
    return addItemToCart({
      id: itemId,
      name,
      price: itemPrice,
      menuId: id,
      menuPrice: basePrice,
    });
  };
  const handleRemoveItemFromCart = () => {
    return removeItemFromCart({
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
        <QtyButton sign={"increment"} onClick={handleAddItemToCart} />
        <div>{name}</div>
        <div className=" ms-auto"> +RM {itemPrice}</div>
        <div>x {itemQty}</div>
        <QtyButton sign={"decrement"} onClick={handleRemoveItemFromCart} />
      </Stack>
      <hr></hr>
    </>
  );
};
