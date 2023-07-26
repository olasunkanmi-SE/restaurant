import { CSSProperties, ChangeEvent, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { CONSTANTS } from "../../constants/constant";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { CartItem, OrderSummary, SelectedItem } from "../../reducers";
import { getLocalStorageData } from "../../utility/utils";
import { QtyButton } from "../MenuItems/addItemButton";
import { Note } from "../Forms/menu-notes";
import { CallToAction } from "../Utilities/modal";

const addToCartStyle: CSSProperties = {
  textAlign: "center",
  marginRight: "10px",
};

type MenuActionType = "Increase" | "Decrease";

/**
 *Upgrade Shopping CartItem Component.
 This component is responsible for updating the shopping cart items
 while on the cart screen.
 *
 * @exports
 * @function UpgradeShoppingCartItem
 *
 */

export const UpgradeShoppingCartItem = () => {
  const orderSummary = getLocalStorageData("orderSummary", true);
  const { GetOrderSummary, updateCartItems, closeCart } = useShoppingCart();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [instructions, setInstructions] = useState("");
  const handleInstructions = (event: ChangeEvent<HTMLInputElement>) => {
    setInstructions(event.target.value);
  };

  const [order, setOrder] = useState<OrderSummary | undefined>(() => {
    if (orderSummary) {
      const parsedOrderSummary = JSON.parse(orderSummary) as OrderSummary;
      return parsedOrderSummary.menus.length > 0 ? parsedOrderSummary : undefined;
    }
  });

  const calculateUpgradeOrderPrice = (
    menuQuantity: number,
    menuBasePrice: number,
    selectedItems: SelectedItem[]
  ): number => {
    const totalItemsPrice = selectedItems.reduce((acc, item) => acc + item.price * item.quantity!, 0);
    const totalPrice = menuQuantity * (menuBasePrice + totalItemsPrice);
    return totalPrice;
  };

  const getSelectedItems = ():
    | { updatedOrder: OrderSummary; selectedItems: SelectedItem[] | [] | undefined; menuPrice: number | undefined }
    | undefined => {
    if (order) {
      const updatedOrder: OrderSummary = { ...order };
      const { selectedItems, menuPrice } = updatedOrder.menus[0];
      return { updatedOrder, selectedItems, menuPrice };
    }
  };

  const handleDecreaseItem = (itemId: string) => {
    if (order) {
      const { updatedOrder, selectedItems, menuPrice } = getSelectedItems()!;
      if (selectedItems?.length) {
        const currentItem = selectedItems.find((item) => item.id === itemId);
        if (currentItem?.quantity) {
          currentItem.quantity -= 1;
          updatedOrder.menus[0].menuTotalPrice = calculateUpgradeOrderPrice(
            updatedOrder.quantity,
            menuPrice!,
            selectedItems
          );
        }
        setOrder(updatedOrder);
      }
    }
  };

  const handleIncreaseItem = (itemId: string) => {
    if (order) {
      const { updatedOrder, selectedItems, menuPrice } = getSelectedItems()!;
      if (selectedItems?.length) {
        const currentItem = selectedItems.find((item) => item.id === itemId);
        if (currentItem) {
          currentItem.quantity! += 1;
          updatedOrder.menus[0].menuTotalPrice = calculateUpgradeOrderPrice(
            updatedOrder.quantity,
            menuPrice!,
            selectedItems
          );
        }
        setOrder(updatedOrder);
      }
    }
  };

  const handleUpdateMenuQty = (type: MenuActionType, order?: OrderSummary) => {
    if (order) {
      const updatedOrder: OrderSummary = { ...order };
      const selectedItems = order.menus[0].selectedItems ?? [];
      const menuPrice = order.menus[0].menuPrice;

      if (menuPrice) {
        const selectedItemTotal = selectedItems.reduce((sum, item) => sum + item.quantity! * item.price, 0);
        type === CONSTANTS.increaseCartMenu ? (updatedOrder.quantity += 1) : (updatedOrder.quantity -= 1);
        if (updatedOrder.quantity > 0) {
          updatedOrder.menus[0].menuTotalPrice =
            updatedOrder.quantity * menuPrice + selectedItemTotal * updatedOrder.quantity;

          if (updatedOrder.menus[0].menuTotalPrice < 0) {
            updatedOrder.menus[0].menuTotalPrice =
              updatedOrder.quantity * menuPrice + selectedItemTotal * updatedOrder.quantity;
          }
        }
        setOrder(updatedOrder);
      }
    }
  };

  const handleOrderQty = () => {
    if (order?.quantity && order.quantity < 1) {
      order.quantity = 1;
    } else if (!order?.quantity) {
      order!.quantity = 1;
    }
    return order!.quantity;
  };

  let { selectedItems, menuTotalPrice, note } = order?.menus[0] as Partial<CartItem & { menuName?: string }>;

  const handleAddToCart = () => {
    if (order) {
      const orderSummary = GetOrderSummary();
      if (orderSummary) {
        const orderIndex = orderSummary.findIndex((summary) => summary.id === order.id);
        if (orderIndex > -1) {
          orderSummary.splice(orderIndex, 1, order);
          if (instructions.length) {
            order.menus[0].note = instructions;
          }
          updateCartItems(orderSummary);
        }
      }
    }
    closeCart();
  };

  const DisplayMenuInstructions = (order: OrderSummary) => {
    if (instructions) {
      return <>{instructions}</>;
    } else {
      return <>{order?.menus[0].note}</>;
    }
  };

  return (
    <div>
      <div>
        <div>
          <p> {order?.menus[0].menuName ?? order?.menus[0].name}</p>
          <p style={{ color: "#205532", fontWeight: "600" }}> RM {order?.menus[0].menuPrice}</p>
        </div>

        <hr></hr>
        <div className="mb-1">
          <small style={{ backgroundColor: "#f7a278", color: "#fff", padding: "1px" }}>Selected Items</small>
        </div>
        <div>
          {order?.menus.length ? (
            selectedItems?.map((item: any) => (
              <div key={item.id}>
                <Stack direction="horizontal" gap={3}>
                  <QtyButton
                    sign={"decrement"}
                    onClick={() => {
                      handleDecreaseItem(item.id);
                    }}
                  />
                  <div>
                    <small>{item.name}</small>
                  </div>
                  <div className=" ms-auto"> +RM {item.price}</div>
                  <div>x {item.quantity}</div>
                  <QtyButton
                    sign={"increment"}
                    onClick={() => {
                      handleIncreaseItem(item.id);
                    }}
                  />
                </Stack>
                <hr></hr>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div>
          <Stack direction="horizontal" gap={3}>
            <div>
              <QtyButton sign={"decrement"} onClick={() => handleUpdateMenuQty("Decrease", order)} />
            </div>
            <div>{handleOrderQty()}</div>
            <div>
              <QtyButton sign={"increment"} onClick={() => handleUpdateMenuQty("Increase", order)} />
            </div>
            <div className="ms-auto">
              <div style={addToCartStyle}>
                <Button onClick={handleAddToCart} className="w-100 btn btn-success" variant="primary" type="button">
                  <small>UPDATE CART</small> RM {menuTotalPrice}
                </Button>
              </div>
            </div>
          </Stack>
        </div>
        <div style={{ marginTop: "15px", backgroundColor: "#fff" }}>
          <Button variant="light" onClick={handleShowModal}>
            <small>Note: {DisplayMenuInstructions(order!)}</small>
          </Button>
        </div>
      </div>
      <div>
        <CallToAction
          handleAction={handleCloseModal}
          handleClose={handleCloseModal}
          show={showModal}
          showCancelButton={true}
        >
          <Note
            closeModal={handleCloseModal}
            onChange={handleInstructions}
            row={2}
            value={note}
            label="Special Instructions"
            placeholder="Add your request (subject to availability)"
            newValue={instructions}
          />
        </CallToAction>
      </div>
    </div>
  );
};
