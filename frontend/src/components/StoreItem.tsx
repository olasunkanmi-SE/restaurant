import { Button, Card, Col, Row } from "react-bootstrap";
const items = [
  {
    id: "63e22729acac310f1ab92914",
    name: "Beand and Dodo",
    description: "Sweet beans with Dodo",
    portion: "sharing",
    price: 50,
    quantity: 10,
    image: "https://guccilounge.net/wp/wp-content/uploads/2020/11/beansdodo8.jpg",
    tags: ["teaditional", "beans"],
    maximumPermitted: 10,
    taxRate: 0.08,
    addons: [
      {
        id: "63e22161acac310f1ab928e1",
        name: "plantain",
        price: 100,
        category: {
          id: "63e220a0acac310f1ab928c6",
          name: "Sides",
          description: "Could include plantain, etc",
          code: "SIDES",
          auditCreatedBy: "oyin1@gmail.com",
          auditCreatedDateTime: "2023-02-07T09:57:52.102Z",
        },
        auditCreatedBy: "oyin1@gmail.com",
        auditCreatedDateTime: "2023-02-07T10:01:05.923Z",
      },
      {
        id: "63e2217bacac310f1ab928e8",
        name: "coke",
        price: 100,
        category: {
          id: "63e220ccacac310f1ab928ca",
          name: "Drink",
          description: "This includes but not limited to softdrink, beer, and water",
          code: "DRINK",
          auditCreatedBy: "oyin1@gmail.com",
          auditCreatedDateTime: "2023-02-07T09:58:36.700Z",
        },
        auditCreatedBy: "oyin1@gmail.com",
        auditCreatedDateTime: "2023-02-07T10:01:31.360Z",
      },
      {
        id: "63e2271aacac310f1ab9290c",
        name: "Tilapia",
        price: 10,
        category: {
          id: "63e226e4acac310f1ab92907",
          name: "Fish",
          description: "This includes all forms of Fish",
          code: "FISH",
          auditCreatedBy: "oyin1@gmail.com",
          auditCreatedDateTime: "2023-02-07T10:24:36.178Z",
        },
        auditCreatedBy: "oyin1@gmail.com",
        auditCreatedDateTime: "2023-02-07T10:25:30.600Z",
      },
    ],
    auditCreatedBy: "oyin1@gmail.com",
    auditCreatedDateTime: "2023-02-07T10:25:45.478Z",
  },
  {
    id: "63e2259bacac310f1ab928f9",
    name: "Eforiro and Amala",
    description: "Tradition yoruba vegetable soup",
    portion: "single",
    price: 70,
    quantity: 100,
    image: "https://i.pinimg.com/originals/44/8b/3b/448b3bd14e894563172b2fe96da0677e.jpg",
    tags: ["teaditional", "vegetable"],
    maximumPermitted: 20,
    taxRate: 0.05,
    addons: [
      {
        id: "63e22147acac310f1ab928da",
        name: "Goat meat",
        price: 100,
        category: {
          id: "63e22035acac310f1ab928be",
          name: "Beef",
          description: "Cow meat",
          code: "BEEF",
          auditCreatedBy: "oyin1@gmail.com",
          auditCreatedDateTime: "2023-02-07T09:56:05.019Z",
        },
        auditCreatedBy: "oyin1@gmail.com",
        auditCreatedDateTime: "2023-02-07T10:00:39.509Z",
      },
      {
        id: "63e2217bacac310f1ab928e8",
        name: "coke",
        price: 100,
        category: {
          id: "63e220ccacac310f1ab928ca",
          name: "Drink",
          description: "This includes but not limited to softdrink, beer, and water",
          code: "DRINK",
          auditCreatedBy: "oyin1@gmail.com",
          auditCreatedDateTime: "2023-02-07T09:58:36.700Z",
        },
        auditCreatedBy: "oyin1@gmail.com",
        auditCreatedDateTime: "2023-02-07T10:01:31.360Z",
      },
      {
        id: "63e22188acac310f1ab928ef",
        name: "Beer",
        price: 100,
        category: {
          id: "63e220ccacac310f1ab928ca",
          name: "Drink",
          description: "This includes but not limited to softdrink, beer, and water",
          code: "DRINK",
          auditCreatedBy: "oyin1@gmail.com",
          auditCreatedDateTime: "2023-02-07T09:58:36.700Z",
        },
        auditCreatedBy: "oyin1@gmail.com",
        auditCreatedDateTime: "2023-02-07T10:01:44.569Z",
      },
    ],
    auditCreatedBy: "oyin1@gmail.com",
    auditCreatedDateTime: "2023-02-07T10:19:07.236Z",
  },
];

type storeItemProps = {
  imageUrl: string;
  name: string;
  description?: string;
  basePrice: number;
  // items: any[];
};

// type itemProps = {
//   name: string;
//   maxQuantity: number;
//   price: number;
// };

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
          <>
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
          </>
        </Col>
      </Row>
    </>
  );
};
