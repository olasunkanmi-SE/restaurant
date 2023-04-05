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

type QtyButtonType = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  sign: string;
};

export const QtyButton = ({ onClick, sign }: QtyButtonType) => {
  return (
    <input
      onClick={onClick}
      style={QtyButtonStyle}
      type="button"
      value={sign === "increment" ? "+" : "-"}
      data-field="quantity"
    ></input>
  );
};
