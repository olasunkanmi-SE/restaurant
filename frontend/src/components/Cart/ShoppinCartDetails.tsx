import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { calculateTotalOrderAmount } from "../../utility/utils";

export const ShoppingCartDetails = () => {
  const { GetOrderSummary } = useShoppingCart();
  const orderSummary = GetOrderSummary();

  const handleCalculateTotalOrder = () => {
    return calculateTotalOrderAmount();
  };

  return (
    <div>
      <div>
        <Stack direction="horizontal" gap={3}>
          <span style={{ color: "#198753", marginTop: "13px", fontWeight: 400, fontSize: "13px" }}>
            <p>SELECTED ITEMS</p>
          </span>
          <span className="ms-auto">
            <Button size="sm" variant="outline-success">
              <small>EDIT</small>
            </Button>
          </span>
        </Stack>
      </div>
      <div style={{ marginTop: "-12px", backgroundColor: "#198753", height: "2px" }}>
        <hr />
      </div>

      {orderSummary.map((summary, i) => (
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
                {summary.menus[0].selectedItems
                  ? summary.menus[0].selectedItems.map((addon, i) => (
                      <div key={i}>
                        <div>
                          <small>
                            x{addon.quantity} {addon.name}
                          </small>
                        </div>
                      </div>
                    ))
                  : ""}
                <hr />
              </div>
            </div>
          ))}
        </div>
      ))}

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
    </div>
  );
};
