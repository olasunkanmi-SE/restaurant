import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export type ModalProps = {
  handleClose(): void;
  show: boolean;
  header?: string;
  body: string;
  action: string;
  handleAction?: any;
  showCancelButton: boolean;
};

export const CallToAction = ({
  handleClose,
  show,
  header,
  body,
  action,
  handleAction,
  showCancelButton,
}: ModalProps) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          {showCancelButton ? (
            <Button variant="inline-secondary" onClick={handleClose}>
              Cancel
            </Button>
          ) : (
            <></>
          )}
          <Button variant="success" onClick={handleAction}>
            {action}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
