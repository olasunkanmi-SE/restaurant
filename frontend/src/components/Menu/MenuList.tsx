import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IMenuData, IMenus } from "../../models/menu.model";
import { getMenus } from "../../apis";
import { MenuItem } from "./MenuItem";

export const MenuList = () => {
  const {
    isLoading,
    isError,
    error,
    data: menus,
  } = useQuery<IMenus, Error>("menus", getMenus, { staleTime: 1000000, cacheTime: 1000000 });
  let response;
  if (isLoading) {
    response = (
      <div className="loading-skeleton">
        <div className="rectangular-div"></div>
      </div>
    );
  } else if (isError) {
    response = <p>`${error.message}`</p>;
  } else {
    response = menus?.data?.map((menu: IMenuData) => {
      const { imageUrl, name, basePrice, description, id } = menu;
      return (
        <Col xs={6} key={menu.id}>
          <Link style={{ textDecoration: "none", borderBottom: "none", color: "#000" }} to={`/menu/${id}`}>
            <MenuItem url={imageUrl} name={name} basePrice={basePrice} description={description} />
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
