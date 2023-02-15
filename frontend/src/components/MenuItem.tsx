import Card from "react-bootstrap/Card";
import { formatCurrency } from "../utility/formatCurrency";
import { Button } from "react-bootstrap";

type menuItemProps = {
  url?: string;
  name: string;
  basePrice: number;
  description: string;
};

export const MenuItem = ({ url, name, basePrice, description }: menuItemProps) => {
  return (
    <Card style={{ border: "none" }}>
      <Card.Img style={{ objectFit: "cover" }} height="400px" variant="top" src={url} />
      <Card.Body className="d-flex flex-column">
        <Card.Text className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-6">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(basePrice)}</span>
        </Card.Text>
        <div className="mt-auto">
          <Button className="w-100">Add to Cart +</Button>
        </div>
      </Card.Body>
    </Card>
  );
};
