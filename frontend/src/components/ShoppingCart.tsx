import Offcanvas from "react-bootstrap/Offcanvas";
import { useShoppingCart } from "../hooks/UseShoppingCart";
import { Container } from "react-bootstrap";
import { ShoppingCartDetails } from "./Cart/ShoppinCartDetails";

type shoppingCartAction = {
  isOpen: boolean;
};

export const ShoppingCart = ({ isOpen }: shoppingCartAction) => {
  const { closeCart } = useShoppingCart();
  return (
    <Container>
      <div style={{ maxHeight: "100%" }}>
        <Offcanvas fullscreen={true} show={isOpen} onHide={closeCart} placement="top">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div>
                <div style={{ color: "#407c54" }}>
                  <p>ORDER SUMMARY</p>
                </div>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ backgroundColor: "#fafafa" }}>
            <ShoppingCartDetails />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </Container>
  );
};
