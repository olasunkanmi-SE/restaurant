import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties } from "react";

const plusSignContainer: CSSProperties = {
  display: "inline-block",
  width: "25px",
  height: "25px",
  border: "2px solid #000",
  borderRadius: "50%",
  textAlign: "center",
};

const plusSign: CSSProperties = {
  display: "block",
  fontSize: "16px",
  fontWeight: "bold",
  lineHeight: 1,
  marginTop: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
};

type buttonSign = {
  sign: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  style?: CSSProperties;
};

const ButtonDiv: React.FC<buttonSign> = ({ onClick, children }: buttonSign) => {
  return <span onClick={onClick}>{children}</span>;
};

export const IncrementOrDecrementButton = ({ sign, onClick, children }: buttonSign) => {
  return (
    <div style={plusSignContainer}>
      <ButtonDiv style={plusSign} sign={sign} onClick={onClick}>
        {children}
        {sign === "increment" ? <FontAwesomeIcon icon={faPlus} /> : <FontAwesomeIcon icon={faMinus} />}
      </ButtonDiv>
    </div>
  );
};
