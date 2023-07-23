import { Stack } from "react-bootstrap";
import { SelectedItem } from "../../reducers";

export type cartSelectedItem = {
  selectedItem: SelectedItem;
  isEdit: boolean;
};

const DisplaySelectedItems = (selectedItem: SelectedItem) => {
  if (selectedItem.quantity && selectedItem.quantity > 0) {
    return <small>{`x${selectedItem.quantity} ${selectedItem.name}`}</small>;
  }
};

export const CartSelectedItems = ({ selectedItem }: cartSelectedItem) => {
  return (
    <div>
      <Stack key={selectedItem.id} direction="horizontal" gap={3} style={{ marginBottom: "10px", marginTop: "10px" }}>
        <span>{DisplaySelectedItems(selectedItem)}</span>
      </Stack>
    </div>
  );
};
