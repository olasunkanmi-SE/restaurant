import { Card, Col, Row } from "react-bootstrap";
import { FoodItemList } from "./FoodItemList";
import { Item } from "../reducers";

export type storeItemProps = {
  id: string;
  imageUrl?: string;
  name: string;
  description?: string;
  basePrice: number;
  quantity: number;
  items: Item[];
};

export const StoreItem = ({ id, name, description, imageUrl, basePrice, items, quantity }: storeItemProps) => {
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
          <>
            {items.map((item) => (
              <div className="mb-5" key={item.id}>
                <FoodItemList
                  quantity={quantity}
                  items={items}
                  id={id}
                  itemId={item.id}
                  name={item.name}
                  itemPrice={item.price}
                  basePrice={basePrice}
                />
              </div>
            ))}
          </>
        </Col>
      </Row>
    </>
  );
};
