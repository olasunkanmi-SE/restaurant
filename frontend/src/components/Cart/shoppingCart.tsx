import Offcanvas from "react-bootstrap/Offcanvas";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { Container } from "react-bootstrap";
import { ShoppingCartDetails } from "./ShoppinCartDetails";

type shoppingCartAction = {
  isOpen: boolean;
};

export const ShoppingCart = ({ isOpen }: shoppingCartAction) => {
  const { closeCart } = useShoppingCart();
  return (
    <Container>
      <div>
        <Offcanvas show={isOpen} onHide={closeCart}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div>
                <div>ORDER SUMMARY</div>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ShoppingCartDetails />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </Container>
  );
};
