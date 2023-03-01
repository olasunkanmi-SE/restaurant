import { useQuery } from "react-query";
import { getMenus } from "../../apis";
import { IMenu } from "../../models/menu.model";
import { MenuItem } from "../../components";
import { Col, Row } from "react-bootstrap";

export const MenuList = () => {
  const {
    isLoading,
    isError,
    error,
    data: menus,
  } = useQuery<IMenu, Error>("menus", getMenus, { staleTime: 1000000, cacheTime: 1000000 });
  console.log(menus);
  let response;
  if (isLoading) {
    response = <p>...Loading</p>;
  } else if (isError) {
    response = <p>`${error.message}`</p>;
  } else {
    response = menus?.data?.map((menu) => {
      const { imageUrl, name, basePrice, description, id } = menu;
      return (
        <Col md={3} key={menu.id}>
          <MenuItem id={id} url={imageUrl} name={name} basePrice={basePrice} description={description} />
        </Col>
      );
    });
  }
  return (
    <>
      <Row md={3} xs={1} lg={3} className="g-3">
        {response}
      </Row>
      <Row>
        <Col style={{ overflow: "hidden" }} xs={12} md={12} lg={6}>
          2 of 3 (wider)jnfwoeifnowefogwoefowfowehfohwiooehfow eoufhoweuhfoujsdnjsca scacascacascndjksdn
        </Col>
      </Row>
    </>
  );
};
