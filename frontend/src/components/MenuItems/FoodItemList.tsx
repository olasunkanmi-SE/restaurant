import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { storeItemProps } from "./StoreItem";
import { QtyButton } from "./addItemButton";
import { wordWrap } from "../../utility/utils";
import { CallToAction } from "../Utilities/modal";
import { Note } from "../Forms/text-area";
import { useState } from "react";
import { shoppingCartProps } from "../../contexts/shoppingCartTypes";

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
  const [note, setNote] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const { AddItemToCart, menus, removeItemFromCart }: shoppingCartProps = useShoppingCart();
  let itemQty: number = 0;

  const handleNote = (note: string) => {
    setNote(note);
  };

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
        {itemQty > 0 ? (
          <div className="ms-auto">
            <Button variant="light" onClick={handleShowModal}>
              <small>
                <img width="14" height="14" src="https://img.icons8.com/color/48/pencil--v1.png" alt="pencil--v1" />
                Note
              </small>
            </Button>
          </div>
        ) : (
          <></>
        )}
        <div>{note}</div>
        <div style={{ fontWeight: "bold" }} className=" ms-auto">
          RM{itemPrice}
        </div>
        <div>x {itemQty}</div>
        <QtyButton sign={"increment"} onClick={handleAddItemToCart} />
      </Stack>
      <hr></hr>

      <CallToAction
        handleAction={handleCloseModal}
        handleClose={handleCloseModal}
        show={showModal}
        showCancelButton={true}
      >
        <Note noteFromChild={handleNote} row={3} label="Special Instructions" />
      </CallToAction>
    </div>
  );
};
