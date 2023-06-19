import { Offcanvas } from "react-bootstrap";
import { OffcanvasPlacement } from "react-bootstrap/esm/Offcanvas";

type offCanvasProps = {
  show: boolean;
  onHide: any;
  children: React.ReactNode;
  header: string;
  placement: OffcanvasPlacement;
};

export const OffCanvas = ({ show, onHide, children, header, placement }: offCanvasProps) => {
  return (
    <div>
      <Offcanvas show={show} onHide={onHide} placement={placement}>
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
