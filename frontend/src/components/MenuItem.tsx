import Card from "react-bootstrap/Card";

type menuItemProps = {
  name: string;
  url: string;
  basePrice: number;
  description?: string;
};

export const MenuItem = ({ name, url }: menuItemProps) => {
  return (
    <Card style={{ border: "none" }}>
      <div style={{ backgroundColor: "#f8f9fa" }}>
        <Card.Img style={{ objectFit: "cover", borderRadius: "20px" }} height="200px" variant="top" src={url} />
      </div>
      <small className="fs-6">{name}</small>
    </Card>
  );
};
