import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { OffCanvas } from "../Utilities/OffCanvas";
import { ShoppingCartDetails } from "./ShoppinCartDetails";

type shoppingCartAction = {
  isOpen: boolean;
};

export const ShoppingCart = ({ isOpen }: shoppingCartAction) => {
  const { closeCart } = useShoppingCart();
  const header = "ORDER SUMMARY";
  return (
    <OffCanvas show={isOpen} onHide={closeCart} placement="start" header={header}>
      <ShoppingCartDetails />
    </OffCanvas>
  );
};
