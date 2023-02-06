import { Fragment } from "react";
import storeItems from "../data/items.json";
import { Col, Row } from "react-bootstrap";
import { SnackBar } from "../components";

export const Store = () => {
  return (
    <Fragment>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map((item) => (
          <Col></Col>
        ))}
      </Row>
      <Row>
        <SnackBar />
      </Row>
    </Fragment>
  );
};
