import { nanoid } from "nanoid";
import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../constants/constant";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { OrderSummary } from "../../reducers";
import { calculateServiceCharge, calculateTotalOrderAmount, setLocalStorageData, wordWrap } from "../../utility/utils";
import { QtyButton } from "../MenuItems/addItemButton";
import { CallToAction } from "../Utilities/modal";
import { CartSelectedItems } from "./CartSelectedItems";
import { UpgradeShoppingCartItem } from "./ShoppingCartSelectedItemUpdate";
import { OrderApi } from "../../apis/orderApi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { handleAxiosError } from "../../utility/axios-error-handler";
import { useMutation } from "react-query";
import { ICreateOrderDTO } from "../../dto/order";

export const ShoppingCartDetails = () => {
  const navigate = useNavigate();
  const order = OrderApi();
  const axios = useAxiosPrivate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { GetOrderSummary, resetCart, closeCart, updateCartItems } = useShoppingCart();
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const handleCloseClearCartModal = () => setShowClearCartModal(false);
  const handleShowClearCartModal = () => setShowClearCartModal(true);
  const [showCartItemUpdateModal, setShowCartItemUpdateModal] = useState(false);
  const handleCloseShowCartItemUpdateModal = () => setShowCartItemUpdateModal(false);
  const handleShowCartItemUpdateShowModal = () => setShowCartItemUpdateModal(true);
  const [cartItems, setCartItems] = useState<OrderSummary[]>(GetOrderSummary() ?? []);

  const handleIncreaseCartItem = (summary: OrderSummary) => {
    const index = cartItems.findIndex((item) => item.menus[0].id === summary.menus[0].id);
    if (index > -1) {
      let updatedCartItems = [{ ...summary, id: nanoid() }, ...cartItems];
      setCartItems(updatedCartItems);
      updateCartItems(updatedCartItems);
    }
  };

  const handleRemoveCartItem = (summary: OrderSummary) => {
    const index = cartItems.findIndex((item) => item.id === summary.id);
    if (index > -1) {
      const updatedCartItems = cartItems.filter((item) => item.id !== summary.id);
      setCartItems(updatedCartItems);
      updateCartItems(updatedCartItems);
      if (updatedCartItems.length < 1) {
        setTimeout(() => {
          closeCart();
          navigate("/");
        }, 300);
      }
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

  const displayClearItemModal = () => {
    handleShowClearCartModal();
  };

  const displayCartItemUpdateModal = (summary: OrderSummary) => {
    setLocalStorageData("orderSummary", JSON.stringify(summary), true);
    handleShowCartItemUpdateShowModal();
  };

  const clearOrderSummary = () => {
    handleCloseClearCartModal();
    resetCart();
    closeCart();
    navigate("/");
  };

  const handleCreateOrder: any = useMutation({
    mutationFn: (order: ICreateOrderDTO) => {
      return axios.post("orders/create", order);
    },
  });

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
                <Button onClick={displayClearItemModal} size="sm" variant="outline-success">
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
          <div key={summary.id} style={{ marginTop: "10px" }}>
            <Stack direction="horizontal" gap={3}>
              <span>
                <p>
                  <small>x{summary.quantity} </small>
                  {wordWrap(summary.menus[0].menuName ?? "", 30) ?? wordWrap(summary.menus[0].name ?? "", 30)}
                </p>
              </span>

              <span className="ms-auto">
                <p> {summary.menus[0].menuTotalPrice!}</p>
              </span>
            </Stack>
            <div style={{ marginTop: "-15px" }}>
              {summary.menus[0].selectedItems ? (
                summary.menus[0].selectedItems.map((addon, i) => (
                  <div key={addon.id}>
                    <CartSelectedItems isEdit={isEdit} selectedItem={addon} />
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <div>{summary.menus[0].note?.length ? <small>Note: {summary.menus[0].note}</small> : <></>}</div>
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
                      <Button
                        style={{ borderRadius: "10px" }}
                        size="sm"
                        variant="outline-success"
                        onClick={() => displayCartItemUpdateModal(summary)}
                      >
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
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <small>Subtotal</small>
          <div style={{ fontWeight: 400, fontSize: "12px" }} className="ms-auto">
            <p> {handleCalculateTotalOrder()}</p>
          </div>
        </Stack>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <small>Service Charge</small>
          <div style={{ fontWeight: 400, fontSize: "12px" }} className="ms-auto">
            <p> {calculateServiceCharge(calculateTotalOrderAmount())}</p>
          </div>
        </Stack>
        <Button
          className="w-100"
          variant="success"
          type="submit"
          onClick={() => {
            handleCreateOrder.mutate(order!);
          }}
        >
          PLACE ORDER RM{handleCalculateTotalOrder() + calculateServiceCharge(calculateTotalOrderAmount())}
        </Button>
        <div>
          {handleCreateOrder.isLoading ? (
            "Creating Order..."
          ) : (
            <>{handleCreateOrder.isError ? <div>An error occurred: {handleCreateOrder.error.message}</div> : null}</>
          )}
          {handleCreateOrder.isSuccess ? <div>Order processed successfully</div> : null}
        </div>
      </div>
      <div>
        {showClearCartModal && (
          <CallToAction
            handleAction={clearOrderSummary}
            handleClose={handleCloseClearCartModal}
            show={showClearCartModal}
            header=""
            action="YES"
            showCancelButton={true}
          >
            {CONSTANTS.clearCart}
          </CallToAction>
        )}
        {showCartItemUpdateModal && (
          <CallToAction
            handleAction={clearOrderSummary}
            handleClose={handleCloseShowCartItemUpdateModal}
            show={showCartItemUpdateModal}
            header="UPGRADE SET MEAL"
          >
            <UpgradeShoppingCartItem />
          </CallToAction>
        )}
      </div>
    </div>
  );
};
