import { Button, Stack } from "react-bootstrap";
import { OrderSummary } from "../../reducers";
import { QtyButton } from "../MenuItems/addItemButton";
import { CSSProperties } from "react";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { getLocalStorageData } from "../../utility/utils";

const addToCartStyle: CSSProperties = {
  textAlign: "center",
  marginRight: "10px",
};

export const UpgradeShoppingCartItem = () => {
  const { itemPrice } = useShoppingCart();
  const orderSummary = getLocalStorageData("orderSummary", true);
  let menu: any;
  if (orderSummary) {
    const value: OrderSummary = JSON.parse(orderSummary);
    menu = value.menus[0];
  }
  const { menuPrice, selectedItems, quantity, menuTotalPrice } = menu;
  const handleRemoveItemFromCart = () => {};
  const handleAddItemToCart = () => {};
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
          {selectedItems?.length ? (
            selectedItems.map((item: any) => (
              <div key={item.id}>
                <Stack direction="horizontal" gap={3}>
                  <QtyButton sign={"decrement"} onClick={handleRemoveItemFromCart} />
                  <div>{item.name}</div>
                  <div className=" ms-auto"> +RM {item.price}</div>
                  <div>x {item.quantity}</div>
                  <QtyButton sign={"increment"} onClick={handleAddItemToCart} />
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
                  <small>ADD TO CART</small> RM {menuTotalPrice === undefined ? menuPrice : menuTotalPrice}
                </Button>
              </div>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
};
