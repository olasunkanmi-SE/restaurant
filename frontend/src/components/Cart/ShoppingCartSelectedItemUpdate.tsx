import { Button, Stack } from "react-bootstrap";
import { OrderSummary, selectedItem } from "../../reducers";
import { QtyButton } from "../MenuItems/addItemButton";
import { CSSProperties, useState } from "react";
import { getLocalStorageData } from "../../utility/utils";

const addToCartStyle: CSSProperties = {
  textAlign: "center",
  marginRight: "10px",
};

export const UpgradeShoppingCartItem = () => {
  const orderSummary = getLocalStorageData("orderSummary", true);

  const [order, setOrder] = useState<OrderSummary | undefined>(() => {
    if (orderSummary) {
      const parsedOrderSummary = JSON.parse(orderSummary) as OrderSummary;
      return parsedOrderSummary.menus.length > 0 ? parsedOrderSummary : undefined;
    }
  });

  const calculateUpgradeOrderPrice = (
    menuQuantity: number,
    menuBasePrice: number,
    selectedItems: selectedItem[]
  ): number => {
    const totalItemsPrice = selectedItems.reduce((acc, item) => acc + item.price * item.quantity!, 0);
    const totalPrice = menuQuantity * (menuBasePrice + totalItemsPrice);
    return totalPrice;
  };

  const getSelectedItems = ():
    | { updatedOrder: OrderSummary; selectedItems: selectedItem[] | [] | undefined; menuPrice: number | undefined }
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
        if (currentItem?.quantity) {
          currentItem.quantity += 1;
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

  const { selectedItems, quantity, menuTotalPrice } = order?.menus[0] as any;

  const onRemoveMenuFromCart = () => {};
  const handleInCreaseQty = () => {};
  const addToCart = () => {};

  return (
    <div>
      <div>
        <Stack direction="horizontal" gap={3}>
          <span>
            <p style={{ backgroundColor: "#f7a278", color: "#fff", padding: "4px" }}>Selected Items</p>
          </span>
        </Stack>
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
                  <div>{item.name}</div>
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
              <QtyButton sign={"decrement"} onClick={onRemoveMenuFromCart} />
            </div>
            <div>{quantity ?? 1}</div>
            <div>
              <QtyButton sign={"increment"} onClick={handleInCreaseQty} />
            </div>
            <div className="ms-auto">
              <div style={addToCartStyle}>
                <Button onClick={addToCart} className="w-100 btn btn-success" variant="primary" type="button">
                  <small>ADD TO CART</small> RM {menuTotalPrice}
                </Button>
              </div>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
};
