import { Card, Col, Row } from "react-bootstrap";

type storeItemProps = {
  imageUrl: string;
  name: string;
  description?: string;
  basePrice: number;
};

export const StoreItem = ({ name, description, imageUrl, basePrice }: storeItemProps) => {
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
                  <small className="text-muted">NGR {basePrice}</small>
                </Card.Text>
              </Card.Body>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <p>Addons</p>
          </div>
          {/* <>
            {items.map((item) => (
              <Card className="d-grid mb-5" key={item.id}>
                <div className="d-flex d-grid">
                  <Card.Body className="d-flex flex-column">
                    {item.addons.map((addon) => (
                      <div style={{ textAlign: "left" }} key={addon.id} className="d-flex justify-content-between">
                        <Card.Text>
                          {addon.name}{" "}
                          <span>
                            <br />
                            NGR {addon.price}
                          </span>
                        </Card.Text>
                        <Card.Text className="text-end">
                          <Button variant="outline-info" className="rounded-circle me-2 btn-sm">
                            <span style={{ fontWeight: "bold" }}>-</span>
                          </Button>
                          <Button className="rounded-circle me-2 btn btn-sm align-items-center ">
                            <span style={{ fontWeight: "bold" }}>+</span>
                          </Button>
                        </Card.Text>
                      </div>
                    ))}
                  </Card.Body>
                </div>
              </Card>
            ))}
          </> */}
        </Col>
      </Row>
    </>
  );
};
