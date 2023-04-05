import React from "react";
import { Button, Stack } from "react-bootstrap";
export const AddonScrollBar = () => {
  return (
    <>
      <style>
        {`div::-webkit-scrollbar {
          display: none;
        }`}
      </style>
      <Stack style={{ overflowX: "scroll", marginBottom: "20px" }} direction="horizontal" gap={3}>
        <div>
          <Button type="button" className="btn btn-secondary rounded-pill">
            Drink
          </Button>
        </div>
        <Button className="btn btn-secondary rounded-pill">Meat</Button>
        <Button className="btn btn-secondary rounded-pill">Chicken</Button>
        <Button className="btn btn-secondary rounded-pill">Drink</Button>
        <Button className="btn btn-secondary rounded-pill">Meat</Button>
        <Button className="btn btn-secondary rounded-pill">Chicken</Button>
        <Button className="btn btn-secondary rounded-pill">Drink</Button>
        <Button className="btn btn-secondary rounded-pill">Meat</Button>
        <Button className="btn btn-secondary rounded-pill">Chicken</Button>
      </Stack>
    </>
  );
};
