import { CSSProperties, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { CallToAction } from "../components/Utilities/modal";
import { AuthModal } from "../components/Utilities/AuthModal";

export const Landing = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const pageStyle: CSSProperties = {
    margin: 0,
    padding: 0,
    overflowY: "hidden",
  };

  const backgroundOverlayStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(/food-background.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.5,
  };

  const buttonStyle: CSSProperties = {
    width: "80%",
    margin: "auto",
    borderRadius: 0,
  };
  return (
    <div className="d-flex flex-column" style={pageStyle}>
      <div style={backgroundOverlayStyle}></div>
      <Stack direction="vertical" gap={3} className="p-3 fixed-bottom">
        <Button
          onClick={handleShowModal}
          className="w-10"
          size="lg"
          style={{ ...buttonStyle, backgroundColor: "#407c54", borderColor: "#407c54" }}
        >
          ORDER NOW
        </Button>
        <Button variant="dark" className="w-10" size="sm" style={buttonStyle}>
          Order HISTORY
        </Button>
      </Stack>

      <div>
        <CallToAction handleAction={handleCloseModal} handleClose={handleCloseModal} show={showModal}>
          <AuthModal />
        </CallToAction>
      </div>
    </div>
  );
};
