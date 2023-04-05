import { Stack } from "react-bootstrap";
import { ItemToSummaryMapper } from "../../application/mappers/MenuItem.mapper";
import { useShoppingCart } from "../../hooks/UseShoppingCart";

export type ItemsSummary = {
  id: string;
  name: string;
  qty: number;
};

export const CartItemsList = () => {
  const { menus } = useShoppingCart();
  let itemSummaries: ItemsSummary[] = [];
  if (menus && menus.length) {
    const itemsMap = new Map<string, ItemsSummary>();
    const selectedItems = menus.map((menu) => menu.selectedItems || []);
    const flattenedSelectedItems = selectedItems.flat();
    flattenedSelectedItems.forEach((item) => {
      const selectedItem = ItemToSummaryMapper(item);
      if (itemsMap.has(item.id)) {
        itemsMap.get(item.id)!.qty += 1;
      } else {
        itemsMap.set(item.id, selectedItem);
      }
    });
    for (const item of itemsMap.values()) {
      itemSummaries.push(item);
    }
  }

  return (
    <div className="">
      <Stack direction="horizontal" gap={3} className="gap-3">
        {itemSummaries.map((item) => (
          <small style={{ marginLeft: "4px", fontSize: "11px" }} key={item.id}>
            +{item.name.toLowerCase()} x {item.qty}
          </small>
        ))}
      </Stack>
    </div>
  );
};
