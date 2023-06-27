import Card from "react-bootstrap/Card";
import { MenuInfo } from "./MenuInfo";
import { wordWrap } from "../../utility/utils";

type menuItemProps = {
  name: string;
  url: string;
  basePrice: number;
  description?: string;
};

export const MenuItem = ({ name, url, description, basePrice }: menuItemProps) => {
  return (
    <Card className="menuCard">
      <div>
        <Card.Img style={{ objectFit: "cover", borderRadius: "50px" }} height="200px" variant="top" src={url} />
        <MenuInfo
          name={wordWrap(name ? name : "", 20)}
          price={basePrice}
          description={wordWrap(description ? description : "", 50)}
        />
      </div>
    </Card>
  );
};
