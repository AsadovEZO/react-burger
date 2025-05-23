import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modals");

const Modal = ({ onCloseButtonClick, headerText, type, children }) => {
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

Modal.propTypes = {
  onCloseButtonClick: PropTypes.func.isRequired,
  headerText: PropTypes.string,
  type: PropTypes.oneOf(["order", "ingredient"]).isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
