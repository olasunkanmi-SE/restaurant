import { ChangeEvent, useState } from "react";
import { Card, CardGroup, Form } from "react-bootstrap";
import { OffcanvasPlacement } from "react-bootstrap/esm/Offcanvas";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { axiosPrivate } from "../../apis/axios";
import { IMenus } from "../../models/menu.model";
import { OffCanvas } from "../Utilities/OffCanvas";

type menuSearchAction = {
  isOpen: boolean;
  closeCart: () => void;
  placement: OffcanvasPlacement;
  header: string;
};

export const MenuSearch = ({ isOpen, closeCart, header, placement }: menuSearchAction) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
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
  } = useQuery<IMenus, Error>("menus", getMenus, { staleTime: 3600000, cacheTime: 3600000 });

  const filteredMenus = menus?.data.filter((menu) => {
    return menu.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <OffCanvas show={isOpen} onHide={closeCart} placement={placement} header={header}>
      <div>
        <Form className="d-flex">
          <Form.Control
            type="text"
            onChange={handleSearch}
            value={searchTerm}
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
      </div>
      <div style={{ marginTop: "20px" }}>
        <CardGroup>
          {filteredMenus?.map((menu) => (
            <Card key={menu.id}>
              <div className="d-flex align-items-center">
                <Card.Img
                  variant="top"
                  src={menu.imageUrl}
                  style={{ maxWidth: "50px", height: "50px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                />
                <Link to={`menu/${menu.id}`} style={{ textDecoration: "none", color: "#000" }}>
                  <Card.Body>
                    <p>{menu.name}</p>
                  </Card.Body>
                </Link>
              </div>
            </Card>
          ))}
        </CardGroup>
      </div>
    </OffCanvas>
  );
};
