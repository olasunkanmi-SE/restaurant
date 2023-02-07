import Card from "react-bootstrap/Card";

type menuItemProps = {
  id: string;
  url: string;
  name: string;
};

export const MenuItem = ({ id, url, name }: menuItemProps) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img style={{ objectFit: "cover" }} variant="top" src={url} />
      <Card.Body>
        <p style={{ textAlign: "center" }}>{name}</p>
      </Card.Body>
    </Card>
  );
};
