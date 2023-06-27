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
          <Button
            style={{
              color: "#000",
              backgroundColor: "#fff",
              boxShadow: "0 2px 0.3rem 0 rgba(0,0,0,.3)",
              height: "2.3rem",
              maxWidth: "160px",
              minWidth: "5rem",
            }}
            type="button"
            className="btn btn-secondary rounded-pill"
          >
            Drink from heaven
          </Button>
        </div>
        <Button
          style={{
            color: "#000",
            backgroundColor: "#fff",
            boxShadow: "0 2px 0.3rem 0 rgba(0,0,0,.3)",
            height: "2.3rem",
            maxWidth: "160px",
            minWidth: "5rem",
          }}
          className="btn btn-secondary rounded-pill"
        >
          Meat
        </Button>
        <Button
          style={{
            color: "#000",
            backgroundColor: "#fff",
            boxShadow: "0 2px 0.3rem 0 rgba(0,0,0,.3)",
            height: "2.3rem",
            maxWidth: "160px",
            minWidth: "5rem",
          }}
          className="btn btn-secondary rounded-pill"
        >
          Chicken
        </Button>
        <Button
          style={{
            color: "#000",
            backgroundColor: "#fff",
            boxShadow: "0 2px 0.3rem 0 rgba(0,0,0,.3)",
            height: "2.3rem",
            maxWidth: "160px",
            minWidth: "5rem",
          }}
          className="btn btn-secondary rounded-pill"
        >
          Drink
        </Button>
        <Button
          style={{
            color: "#000",
            backgroundColor: "#fff",
            boxShadow: "0 2px 0.3rem 0 rgba(0,0,0,.3)",
            height: "2.3rem",
            maxWidth: "160px",
            minWidth: "5rem",
          }}
          className="btn btn-secondary rounded-pill"
        >
          Meat
        </Button>
        <Button
          style={{
            color: "#000",
            backgroundColor: "#fff",
            boxShadow: "0 2px 0.3rem 0 rgba(0,0,0,.3)",
            height: "2.3rem",
            maxWidth: "160px",
            minWidth: "5rem",
          }}
          className="btn btn-secondary rounded-pill"
        >
          Chicken
        </Button>
        <Button
          style={{
            color: "#000",
            backgroundColor: "#fff",
            boxShadow: "0 2px 0.3rem 0 rgba(0,0,0,.3)",
            height: "2.3rem",
            maxWidth: "160px",
            minWidth: "5rem",
          }}
          className="btn btn-secondary rounded-pill"
        >
          Drink
        </Button>
        <Button
          style={{
            color: "#000",
            backgroundColor: "#fff",
            boxShadow: "0 2px 0.3rem 0 rgba(0,0,0,.3)",
            height: "2.3rem",
            maxWidth: "160px",
            minWidth: "5rem",
          }}
          className="btn btn-secondary rounded-pill"
        >
          Meat
        </Button>
        <Button
          style={{
            color: "#000",
            backgroundColor: "#fff",
            boxShadow: "0 2px 0.3rem 0 rgba(0,0,0,.3)",
            height: "2.3rem",
            maxWidth: "160px",
            minWidth: "5rem",
          }}
          className="btn btn-secondary rounded-pill"
        >
          Chicken
        </Button>
      </Stack>
    </>
  );
};
