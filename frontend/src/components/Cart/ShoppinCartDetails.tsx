import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../hooks/UseShoppingCart";

export const ShoppingCartDetails = () => {
  const { menus } = useShoppingCart();
  return (
    <div>
      <div>
        <div>SELECTED ITEMS</div>
        <hr />
        <Stack gap={3}>
          <div>
            <Stack direction="horizontal" gap={3}>
              <div>First item</div>
              <div className="ms-auto">Third item</div>
            </Stack>
          </div>
          <div>Second item</div>
          <div>Third item</div>
        </Stack>
        <div>
          <Stack direction="horizontal" gap={3}>
            <div>Total</div>
            <div style={{ fontWeight: 600 }} className="ms-auto">
              RM 200
            </div>
          </Stack>
          <Button className="w-100" variant="primary" type="submit">
            PLACE ORDER RM200
          </Button>
        </div>
      </div>
    </div>
  );
};
