import { Form } from "react-bootstrap";
import { MenuList } from "../components/Menu/MenuList";
import { AddonScrollBar } from "../components/Utilities/AddonScrollBar";

export const Home = () => {
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Form className="d-flex">
          <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
        </Form>
      </div>
      <AddonScrollBar />

      <MenuList />
    </div>
  );
};
