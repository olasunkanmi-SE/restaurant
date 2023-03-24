import Card from "react-bootstrap/Card";

type menuItemProps = {
  name: string;
  url: string;
  basePrice: number;
  description: string;
};

export const MenuItem = ({ name, url }: menuItemProps) => {
  return (
    <Card style={{ border: "none" }}>
      <div style={{ backgroundColor: "#f8f9fa" }}>
        <Card.Img style={{ objectFit: "cover", borderRadius: "20px" }} height="200px" variant="top" src={url} />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Text className="d-flex justify-content-between align-items-baseline mb-4">
          <small className="fs-6">{name}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
