import { Stack } from "react-bootstrap";
import { selectedItem } from "../../reducers";
import { QtyButton } from "../MenuItems/addItemButton";
import { useShoppingCart } from "../../hooks/UseShoppingCart";
import { useState } from "react";

export type cartSelectedItem = {
  selectedItem: selectedItem;
  isEdit: boolean;
};

export const ShoppingCartSelectedItem = ({ selectedItem, isEdit }: cartSelectedItem) => {
  const { GetOrderSummary } = useShoppingCart();

  return (
    <div>
      <Stack key={selectedItem.id} direction="horizontal" gap={3} style={{ marginBottom: "10px", marginTop: "10px" }}>
        <span>
          <small>
            x{selectedItem.quantity} {selectedItem.name}
          </small>
        </span>
      </Stack>
    </div>
  );
};
