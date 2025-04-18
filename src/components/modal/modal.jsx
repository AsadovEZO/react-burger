import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";

const Modal = ({ show, onCloseButtonClick, headerText, content, type }) => {
  if (!show) {
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

        <section>{content}</section>
      </section>
    </ModalOverlay>,
    document.body
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
  headerText: PropTypes.string,
  content: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["order", "ingredient"]).isRequired,
};

export default Modal;
