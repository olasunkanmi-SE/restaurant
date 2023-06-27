import { CSSProperties } from "react";
import { QtyButton } from "../MenuItems/addItemButton";

type description = {
  name: string;
  description?: string;
  price: number;
};

const nameStyle: CSSProperties = {
  maxHeight: "3.6em",

  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  fontSize: "18.4px",
  lineHeight: "17.28px",
  flex: "0 0 auto",
  fontWeight: 600,
};

const info: CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  lineHeight: "1.2em",
  zIndex: 99,
  flex: "1 20 auto",
  fontFamily: "Roboto Condensed",
};

const handleClick = () => {
  return "Hello";
};

export const MenuInfo = ({ name, description, price }: description) => {
  return (
    <>
      <div style={info} className="vstack gap-2 mt-3">
        <div style={nameStyle}>{name}</div>
        <div>{description}</div>
        <div style={{ marginTop: "5px", marginBottom: "20px" }} className="hstack gap-2">
          <div style={{ margin: "auto", fontWeight: 600 }}>RM {price}</div>
          <div style={{ margin: "auto" }} className="ms-auto">
            <QtyButton sign="home" onClick={handleClick} />
          </div>
        </div>
      </div>
    </>
  );
};
