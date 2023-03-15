import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useShoppingCart } from "../contexts";
import { formatCurrency } from "../utility/utils";

type menuItemProps = {
  id: string;
  url?: string;
  name: string;
  basePrice: number;
  description: string;
};

export const MenuItem = ({ id, url, name, basePrice, description }: menuItemProps) => {
  const { addToCart, removeFromCart, quantity, cart } = useShoppingCart();
  return (
    <Card style={{ border: "none" }}>
      <div style={{ backgroundColor: "#f8f9fa" }}>
        <Card.Img style={{ objectFit: "cover", borderRadius: "20px" }} height="200px" variant="top" src={url} />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Text className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-6">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(basePrice)}</span>
        </Card.Text>
        <div className="mt-auto">
          <Button onClick={() => addToCart({ id, name, basePrice, quantity })} className="w-100">
            Add to Cart +
          </Button>
          <div></div>
          {quantity ? (
            <Button onClick={() => removeFromCart({ id, name, basePrice, quantity })} className="w-100">
              Remove from Cart -
            </Button>
          ) : null}
        </div>
        <div>{cart.map((c) => c.name)}</div>
      </Card.Body>
    </Card>
  );
};
