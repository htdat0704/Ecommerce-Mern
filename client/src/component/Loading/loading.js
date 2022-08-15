import Modal from "react-bootstrap/Modal";
import ReactLoading from "react-loading";
import Badge from "react-bootstrap/Badge";
import React from "react";

const LoadingModal = ({ show, type = null }) => {
  return (
    <Modal show={show}>
      <Modal.Title style={{ textAlign: "center" }}>
        <Badge pill>{type}</Badge>
      </Modal.Title>

      <Modal.Body className="container">
        <ReactLoading
          type={"balls"}
          color={
            type === "ADD" ? "green" : type === "UPDATE" ? "yellow" : "red"
          }
        />
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
