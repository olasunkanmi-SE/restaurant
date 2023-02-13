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
  } = useQuery<IMenu, Error>("menus", getMenus, { staleTime: 1000, cacheTime: 10000 });
  console.log(menus);
  let response;
  if (isLoading) {
    response = <p>...Loading</p>;
  } else if (isError) {
    response = <p>`${error.message}`</p>;
  } else {
    response = menus?.data?.map((menu) => {
      return (
        <Col md={3} key={menu.id}>
          <MenuItem url={menu.imageUrl} name={menu.name} />
        </Col>
      );
    });
  }
  return (
    <Row md={3} xs={2} lg={4} className="g-3">
      {response}
    </Row>
  );
};
