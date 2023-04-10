import { Stack } from "react-bootstrap";
import { ItemToSummaryMapper } from "../../application/mappers/MenuItem.mapper";
import { useShoppingCart } from "../../hooks/UseShoppingCart";

export type ItemsSummary = {
  id: string;
  name: string;
  qty: number;
};

type MenuItem = {
  id: string;
};

export const CartItemsList = ({ id }: MenuItem) => {
  const { menus } = useShoppingCart();
  let itemSummaries: ItemsSummary[] = [];
  const menu = menus.find((menu) => menu.id === id);
  if (menu?.selectedItems) {
    itemSummaries = menu.selectedItems.map((item) => ItemToSummaryMapper(item));
  }
  return (
    <div className="">
      <Stack direction="horizontal" gap={3} className="gap-3">
        {itemSummaries.map((item) =>
          item.qty > 0 ? (
            <small style={{ marginLeft: "4px", fontSize: "11px" }} key={item.id}>
              +{item.name.toLowerCase()} x {item.qty}
            </small>
          ) : (
            ""
          )
        )}
      </Stack>
    </div>
  );
};
