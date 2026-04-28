import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { createPortal } from "react-dom";
import { ModalBackdrop, ModalContainer } from "./Modal.styled";

const ModalTemplate = () => {
  const { handleModal, modalContent, modal } = useContext(ModalContext);

  if (modal) {
    return createPortal(
      <ModalBackdrop>
        <ModalContainer>{modalContent}</ModalContainer>
      </ModalBackdrop>,
      document.getElementById("modal-root"),
    );
  }
  return null;
};

export default ModalTemplate;
