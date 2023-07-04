import { Card, Col, Row, Stack } from "react-bootstrap";
import { Item } from "../../reducers";
import { FoodItemList } from "./FoodItemList";
import { NoMenuItems } from "./NoMenuItems";
import { wordWrap } from "../../utility/utils";
import { useState } from "react";

export type storeItemProps = {
  id: string;
  imageUrl?: string;
  name: string;
  description?: string;
  basePrice: number;
  quantity: number;
  items: Item[];
  handleCheck: () => void;
  isChecked: boolean;
  handleUnCheck: () => void;
  enableAddToCartBtns: () => void;
};

export const StoreItem = ({
  id,
  name,
  description,
  imageUrl,
  basePrice,
  items,
  quantity,
  handleCheck,
  isChecked,
  handleUnCheck,
  enableAddToCartBtns,
}: storeItemProps) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  return (
    <>
      <Row>
        <Col className="mb-3">
          <Card>
            <div className="d-flex">
              <Card.Img style={{ objectFit: "cover" }} height="100px" variant="left" src={imageUrl} />
              <Card.Body style={{ overflow: "hidden" }} className="d-flex flex-column">
                <Card.Title>{name}</Card.Title>
                <Card.Text>{wordWrap(description ?? "", 90)}</Card.Text>
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
            <span>
              <p>
                <i style={{ backgroundColor: "#f7a278", color: "#fff", padding: "4px" }}>More Portion</i>
              </p>
            </span>
          </div>
          <div>
            <NoMenuItems isChecked={isChecked} handleCheck={handleCheck} />
          </div>
          <div className="pt-2 elBg">
            {items.map((item) => (
              <div key={item.id}>
                <FoodItemList
                  enableAddToCartBtns={enableAddToCartBtns}
                  handleUnCheck={handleUnCheck}
                  quantity={quantity}
                  id={id}
                  itemId={item.id}
                  name={item.name}
                  menuName={name}
                  itemPrice={item.price}
                  basePrice={basePrice}
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};
