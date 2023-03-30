import Card from "react-bootstrap/Card";
import { MenuInfo } from "./MenuInfo";

type menuItemProps = {
  name: string;
  url: string;
  basePrice: number;
  description?: string;
};

export const MenuItem = ({ name, url, description, basePrice }: menuItemProps) => {
  return (
    <Card style={{ border: "none", borderRadius: "10% " }}>
      <div>
        <Card.Img style={{ objectFit: "cover", borderRadius: "50px" }} height="200px" variant="top" src={url} />
        <MenuInfo name={name} price={basePrice} description={description} />
      </div>
    </Card>
  );
};
