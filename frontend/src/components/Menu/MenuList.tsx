import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IMenuData, IMenus } from "../../models/menu.model";
import { MenuItem } from "./MenuItem";

export const MenuList = () => {
  const axiosPrivate = useAxiosPrivate();

  const getMenus = async (): Promise<IMenus> => {
    //remove the add coded value and make it dynamic
    const response = await axiosPrivate.get("/menus/singleclient/63d792433b857e1697fe7017");
    return response.data;
  };

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
