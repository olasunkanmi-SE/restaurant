import Card from "react-bootstrap/Card";
import { useShoppingCart } from "../contexts";

type menuItemProps = {
  id: string;
  url?: string;
  name: string;
  basePrice: number;
  description?: string;
};

const menuNameStyle: CSSProperties = {
  fontSize: "14px",
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
          <small className="fs-6">{name}</small>
        </Card.Text>
        <div>{cart.map((c) => c.name)}</div>
      </Card.Body>
    </Card>
  );
};
