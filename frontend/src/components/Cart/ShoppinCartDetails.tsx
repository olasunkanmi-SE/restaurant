import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { calculateTotalOrderAmount } from "../../utility/utils";
import { QtyButton } from "../MenuItems/addItemButton";
import { useNavigate } from "react-router-dom";
import { CallToAction } from "../Utilities/modal";

export const ShoppingCartDetails = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [itemQty, setItemQty] = useState<number>(1);
  const { GetOrderSummary, resetCart, closeCart } = useShoppingCart();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const orderSummary = GetOrderSummary();

  const handleIncreaseQty = () => {
    setItemQty(itemQty + 1);
  };

  const handleDecreaseQty = () => {
    itemQty === 1 ? setItemQty(1) : setItemQty(itemQty - 1);
  };

  const handleCalculateTotalOrder = () => {
    return calculateTotalOrderAmount();
  };

  const handleCartItemsEdit = () => {
    setIsEdit(true);
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
                <Button size="sm" variant="success">
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

      {orderSummary ? (
        orderSummary.map((summary, i) => (
          <div key={i} style={{ marginTop: "10px" }}>
            {new Array(summary.quantity).fill(null).map((_, i) => (
              <div key={i}>
                <Stack direction="horizontal" gap={3}>
                  <span>
                    <p>{summary.menus[0].menuName}</p>
                  </span>
                  <span className="ms-auto">
                    <p>RM {summary.menus[0].menuTotalPrice! / summary.quantity}</p>
                  </span>
                </Stack>
                <div style={{ marginTop: "-15px" }}>
                  {summary.menus[0].selectedItems ? (
                    summary.menus[0].selectedItems.map((addon, i) => (
                      <div key={i}>
                        <div>
                          <small
                            style={{
                              fontSize: "12.8px",
                              lineHeight: "19.2px",
                            }}
                          >
                            x{addon.quantity} {addon.name}
                          </small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                  {isEdit === true ? (
                    <Stack direction="horizontal" gap={3} style={{ marginLeft: "-6px", marginTop: "5px" }}>
                      <div>
                        <QtyButton sign={"decrement"} onClick={handleDecreaseQty} />
                      </div>
                      <div> {itemQty} </div>
                      <div>
                        <QtyButton sign={"increment"} onClick={handleIncreaseQty} />
                      </div>
                      <div>
                        <Button style={{ borderRadius: "30px" }} size="sm" variant="outline-success">
                          <small>EDIT</small>
                        </Button>
                      </div>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  <hr />
                </div>
              </div>
            ))}
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
      />
    </div>
  );
};
