import { Offcanvas } from "react-bootstrap";

type offCanvas = {
  show: boolean;
  onHide: boolean;
  children: React.ReactNode;
  header: string;
};

export const OffCanvas = ({ show, onHide, children, header }: offCanvas) => {
  return (
    <div>
      <Offcanvas show={show} onHide={onHide} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div>
              <div style={{ color: "#407c54" }}>
                <p>{header}</p>
              </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ backgroundColor: "#fafafa" }}>{children}</Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
