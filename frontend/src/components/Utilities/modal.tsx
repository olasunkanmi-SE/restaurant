import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export type ModalProps = {
  handleClose(): void;
  show: boolean;
  header?: string;
  children: React.ReactNode;
  action?: string;
  handleAction?: any;
  showCancelButton?: boolean;
};

export const CallToAction = ({
  handleClose,
  show,
  header,
  children,
  action,
  handleAction,
  showCancelButton,
}: ModalProps) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        {header ? (
          <Modal.Header closeButton>
            <Modal.Title>{header}</Modal.Title>
          </Modal.Header>
        ) : (
          <></>
        )}
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          {showCancelButton ? (
            <Button variant="inline-secondary" onClick={handleClose}>
              Cancel
            </Button>
          ) : (
            <></>
          )}
          {action ? (
            <Button variant="success" onClick={handleAction}>
              {action}
            </Button>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
