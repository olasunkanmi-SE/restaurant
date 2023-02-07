import Card from "react-bootstrap/Card";

type menuItemProps = {
  url?: string;
  name: string;
};

export const MenuItem = ({ url, name }: menuItemProps) => {
  return (
    <Card style={{ border: "none" }}>
      <Card.Img style={{ objectFit: "cover" }} variant="top" src={url} />
      <Card.Body>
        <p style={{ textAlign: "center" }}>{name}</p>
      </Card.Body>
    </Card>
  );
};
