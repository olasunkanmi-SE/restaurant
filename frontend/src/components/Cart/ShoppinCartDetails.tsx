import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { calculateTotalOrderAmount } from "../../utility/utils";
import { useNavigate } from "react-router-dom";
import { CallToAction } from "../Utilities/modal";
import { ShoppingCartSelectedItem } from "./shoppingCartSelectedItem";
import { QtyButton } from "../MenuItems/addItemButton";
import { OrderSummary } from "../../reducers";
import { nanoid } from "nanoid";

export const ShoppingCartDetails = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { GetOrderSummary, resetCart, closeCart } = useShoppingCart();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [cartItems, setCartItems] = useState<OrderSummary[]>(GetOrderSummary() ?? []);

  const handleIncreaseCartItem = (summary: OrderSummary) => {
    const index = cartItems.findIndex((item) => item.menus[0].id === summary.menus[0].id);
    if (index > -1) {
      let updatedCartItems = [{ ...summary, id: nanoid() }, ...cartItems];
      setCartItems(updatedCartItems);
      console.log(updatedCartItems);
    }
  };

  const handleRemoveCartItem = (summary: OrderSummary) => {
    const index = cartItems.findIndex((item) => item.id === summary.id);
    if (index > -1) {
      const updatedCartItem = cartItems.filter((item) => item.id !== summary.id);
      setCartItems(updatedCartItem);
    }
  };

  const handleCalculateTotalOrder = () => {
    return calculateTotalOrderAmount();
  };

  const handleCartItemsEdit = () => {
    setIsEdit(true);
  };

  const handleOrderConfirmation = () => {
    setIsEdit(false);
  };

  const displayModal = () => {
    handleShowModal();
  };

  const clearOrderSummary = () => {
    handleCloseModal();
    resetCart();
    closeCart();
    navigate("/");
  };

  return (
    <div>
      <div>
        <Stack direction="horizontal" gap={3}>
          <span style={{ color: "#407c54", marginTop: "13px", fontWeight: 400, fontSize: "13px" }}>
            <p>SELECTED ITEMS</p>
          </span>

          {isEdit === false ? (
            <span className="ms-auto">
              <Button onClick={handleCartItemsEdit} size="sm" variant="outline-success">
                <small>EDIT</small>
              </Button>
            </span>
          ) : (
            <>
              <span className="ms-auto">
                <Button onClick={displayModal} size="sm" variant="outline-success">
                  <small>CLEAR ALL</small>
                </Button>
              </span>
              <span>
                <Button onClick={handleOrderConfirmation} size="sm" variant="success">
                  <small>CONFIRM</small>
                </Button>
              </span>
            </>
          )}
        </Stack>
      </div>
      <div style={{ marginTop: "-12px", backgroundColor: "#407c54", height: "2px" }}>
        <hr />
      </div>

      {cartItems ? (
        cartItems.map((summary, i) => (
          <div key={i} style={{ marginTop: "10px" }}>
            <Stack direction="horizontal" gap={3}>
              <span>
                <p>
                  <small>x{summary.quantity} </small>
                  {summary.menus[0].menuName}
                </p>
              </span>

              <span className="ms-auto">
                <p>RM {summary.menus[0].menuTotalPrice!}</p>
              </span>
            </Stack>
            <div style={{ marginTop: "-15px" }}>
              {summary.menus[0].selectedItems ? (
                summary.menus[0].selectedItems.map((addon, i) => (
                  <div key={addon.id}>
                    <ShoppingCartSelectedItem isEdit={isEdit} selectedItem={addon} />
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <div style={{ marginLeft: "-8px" }}>
              {isEdit ? (
                <span>
                  <Stack direction="horizontal" gap={3}>
                    <span>
                      <QtyButton sign={"decrement"} onClick={() => handleRemoveCartItem(summary)} />
                    </span>
                    <span>{1}</span>
                    <span>
                      <QtyButton sign={"increment"} onClick={() => handleIncreaseCartItem(summary)} />
                    </span>
                    <span>
                      <Button style={{ borderRadius: "10px" }} size="sm" variant="outline-success">
                        <small>EDIT</small>
                      </Button>
                    </span>
                  </Stack>
                </span>
              ) : (
                <></>
              )}
            </div>
            <hr />
          </div>
        ))
      ) : (
        <></>
      )}

      <div>
        <Stack direction="horizontal" gap={3}>
          <div>Total</div>
          <div style={{ fontWeight: 600 }} className="ms-auto">
            <p>RM {handleCalculateTotalOrder()}</p>
          </div>
        </Stack>
        <Button className="w-100" variant="success" type="submit">
          PLACE ORDER RM{handleCalculateTotalOrder()}
        </Button>
      </div>
      <CallToAction
        handleAction={clearOrderSummary}
        handleClose={handleCloseModal}
        show={showModal}
        header=""
        body="Are you sure you want to clear the cart ?"
        action="OK"
        showCancelButton={true}
      />
    </div>
  );
};
