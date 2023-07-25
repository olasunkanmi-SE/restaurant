import { Button, Stack } from "react-bootstrap";
import { shoppingCartProps } from "../../contexts/shoppingCartTypes";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { wordWrap } from "../../utility/utils";
import { storeItemProps } from "./StoreItem";
import { QtyButton } from "./addItemButton";

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
  const { AddItemToCart, menus, removeItemFromCart }: shoppingCartProps = useShoppingCart();
  let itemQty: number = 0;

  const handleAddItemToCart = (): void => {
    enableAddToCartBtns();
    handleUnCheck();
    return AddItemToCart({
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
      id: itemId,
      name,
      price: itemPrice,
      menuId: id,
      menuPrice: basePrice,
    });
  };
  if (menus?.length) {
    const selectedItems = menus.map((menu) => menu.selectedItems ?? []);
    const flattenedSelectedItems = selectedItems.flat();
    flattenedSelectedItems.forEach((item) => {
      if (item.id === itemId) {
        itemQty = item.quantity!;
      }
    });
  }

  return (
    <div style={{ fontSize: "10px" }}>
      <Stack direction="horizontal" gap={3}>
        <QtyButton sign={"decrement"} onClick={handleRemoveItemFromCart} />
        <div>{wordWrap(name, 20)}</div>
        <div style={{ fontWeight: "bold" }} className=" ms-auto">
          RM{itemPrice}
        </div>
        <div>x {itemQty}</div>
        <QtyButton sign={"increment"} onClick={handleAddItemToCart} />
      </Stack>
      <hr></hr>
    </div>
  );
};
