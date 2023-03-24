import { Button, Card, Col, Row } from "react-bootstrap";
import { IItem } from "../models/item.model";

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
              <i>More Portion</i>
            </p>
          </div>
          <>
            {items.map((item) => (
              <Card className="d-grid mb-5" key={item.id}>
                <div className="d-flex d-grid">
                  <Card.Body className="d-flex flex-column">
                    <div style={{ textAlign: "left" }} className="d-flex justify-content-between">
                      <Card.Text>
                        {item.name}
                        <span>
                          <br />
                          RM {item.price}
                        </span>
                      </Card.Text>
                      <Card.Text className="text-end">
                        <Button variant="outline-info" className="rounded-circle me-2 btn-sm">
                          <span style={{ fontWeight: "bold" }}>-</span>
                        </Button>
                        <Button className="rounded-circle me-2 btn btn-sm btn-success align-items-center ">
                          <span style={{ fontWeight: "bold" }}>+</span>
                        </Button>
                      </Card.Text>
                    </div>
                  </Card.Body>
                </div>
              </Card>
            ))}
          </>
        </Col>
      </Row>
    </>
  );
};
