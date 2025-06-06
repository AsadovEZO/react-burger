import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "./modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";

interface IModal {
  onCloseButtonClick: () => void;
  headerText?: string;
  type: "order" | "ingredient";
  children: ReactNode;
}

const modalRoot = document.getElementById("modals");

const Modal = ({ onCloseButtonClick, headerText, type, children }: IModal) => {
  if (!modalRoot) {
    return null;
  }
  return ReactDOM.createPortal(
    <ModalOverlay onClose={onCloseButtonClick}>
      <section
        className={`${modalStyles.modal} ${modalStyles[`modal--${type}`]}`}
      >
        <button
          className={modalStyles.closeButton}
          onClick={onCloseButtonClick}
        >
          <CloseIcon type="primary" />
        </button>
        <p className={`${modalStyles.header} text text_type_main-large `}>
          {headerText}
        </p>

        <section>{children}</section>
      </section>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
