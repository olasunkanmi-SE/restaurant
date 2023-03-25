import { Button, Card, Col, Row } from "react-bootstrap";
import { IItem } from "../models/item.model";
import { FoodItemList } from "./FoodItemList";

type storeItemProps = {
  imageUrl: string;
  name: string;
  description?: string;
  basePrice: number;
  items: IItem[];
};

export const StoreItem = ({ name, description, imageUrl, basePrice, items }: storeItemProps) => {
  return (
    <>
      <Row>
        <Col className="mb-3">
          <Card>
            <div className="d-flex">
              <Card.Img style={{ objectFit: "cover" }} height="100px" variant="left" src={imageUrl} />
              <Card.Body style={{ overflow: "hidden" }} className="d-flex flex-column">
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text className="mt-auto">
                  <small className="text-muted">RM {basePrice}</small>
                </Card.Text>
              </Card.Body>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <p>
              <i style={{ backgroundColor: "#f7a278", color: "#fff", padding: "4px" }}>More Portion</i>
            </p>
          </div>
          {/* <>
            {items.map((item) => (
              <div className="mb-5" key={item.id}>
                <FoodItemList name={item.name} price={item.price} />
              </div>
            ))}
          </> */}
        </Col>
      </Row>
    </>
  );
};
