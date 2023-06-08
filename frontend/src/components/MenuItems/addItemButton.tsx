import { CSSProperties } from "react";

const QtyButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  verticalAlign: "middle",
  borderRadius: "50% ",
  marginRight: "0.25rem",
  marginLeft: "0.25rem ",
  border: "1px solid #dee2e6",
  width: "2rem",
  height: "2rem",
};

const positiveQtyBtn: CSSProperties = {
  ...QtyButtonStyle,
  backgroundColor: "#407c54",
  color: "#fff",
  border: "0.0px solid rgb(222, 226, 230)",
};

type QtyButtonType = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  sign: string;
  disabled?: boolean;
};

export const QtyButton = ({ onClick, sign, disabled }: QtyButtonType) => {
  return (
    <input
      disabled={disabled}
      onClick={onClick}
      style={sign === "decrement" || sign === "home" ? QtyButtonStyle : positiveQtyBtn}
      type="button"
      value={sign === "increment" || sign === "home" ? "+" : "-"}
      data-field="quantity"
    ></input>
  );
};
