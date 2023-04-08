import Offcanvas from "react-bootstrap/Offcanvas";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { Container } from "react-bootstrap";

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
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists,
            etc.
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </Container>
  );
};
