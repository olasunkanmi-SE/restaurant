import { Form } from "react-bootstrap";
import { MenuList } from "../components/Menu/MenuList";
import { AddonScrollBar } from "../components/Utilities/AddonScrollBar";
import { useState } from "react";
import { MenuSearch } from "../components/Forms/search";

export const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Form className="d-flex">
          <Form.Control onClick={openCart} type="search" placeholder="Search" className="me-2" aria-label="Search" />
        </Form>
      </div>
      <AddonScrollBar />
      <MenuList />
      <MenuSearch isOpen={isOpen} closeCart={closeCart} placement="bottom" header="" />
    </div>
  );
};
