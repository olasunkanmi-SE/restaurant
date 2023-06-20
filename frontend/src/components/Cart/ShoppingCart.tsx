import { Container } from "react-bootstrap";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { ShoppingCartDetails } from "./ShoppinCartDetails";
import { OffCanvas } from "../Utilities/OffCanvas";

type shoppingCartAction = {
  isOpen: boolean;
};

export const ShoppingCart = ({ isOpen }: shoppingCartAction) => {
  const { closeCart } = useShoppingCart();
  const header = "ORDER SUMMARY";
  return (
    <Container>
      <div style={{ maxHeight: "100%" }}>
        <OffCanvas show={isOpen} onHide={closeCart} placement="bottom" header={header}>
          <ShoppingCartDetails />
        </OffCanvas>
      </div>
    </Container>
  );
};
