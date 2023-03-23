import { useQuery } from "react-query";
import { getMenus } from "../apis";
import { IMenuData, IMenus } from "../models/menu.model";
import { MenuItem } from ".";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MenuList = () => {
  const {
    isLoading,
    isError,
    error,
    data: menus,
  } = useQuery<IMenus, Error>("menus", getMenus, { staleTime: 1000000, cacheTime: 1000000 });
  let response;
  if (isLoading) {
    response = <p>...Loading</p>;
  } else if (isError) {
    response = <p>`${error.message}`</p>;
  } else {
    response = menus?.data?.map((menu: IMenuData) => {
      const { imageUrl, name, basePrice, description, id } = menu;
      return (
        <Col xs={6} key={menu.id}>
          <Link to={`/menu/${name.split(" ").join("-")}`}>
            <MenuItem id={id} url={imageUrl} name={name} basePrice={basePrice} description={description} />
          </Link>
        </Col>
      );
    });
  }
  return (
    <>
      <Row className="g-3">{response}</Row>
    </>
  );
};
