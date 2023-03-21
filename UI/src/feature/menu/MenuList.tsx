import { useQuery } from "react-query";
import { getMenus } from "../../apis";
import { IMenuData, IMenus } from "../../models/menu.model";
import { MenuItem } from "../../components";
import { Col, Row } from "react-bootstrap";

export const MenuList = () => {
  const {
    isLoading,
    isError,
    error,
    data: menus,
  } = useQuery<IMenus, Error>("menus", getMenus, { staleTime: 1000000, cacheTime: 1000000 });
  console.log(menus);
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
          <MenuItem id={id} url={imageUrl} name={name} basePrice={basePrice} description={description} />
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
