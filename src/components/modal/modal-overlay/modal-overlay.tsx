import { useEffect, ReactNode, MouseEvent } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

interface IModalOverlay {
  children: ReactNode;
  onClose: () => void;
}

const ModalOverlay = ({ children, onClose }: IModalOverlay) => {
  const handleOverlayClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className={modalOverlayStyles.wrapper} onClick={handleOverlayClick}>
      {children}
    </div>
  );
};

export default ModalOverlay;
