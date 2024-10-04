interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ children, isOpen, handleClose }:ModalProps) => {
    return (
    <div
      tabIndex={-1}
      role="dialog"
      className={`${isOpen} ? "modal d-block" : "modal d-none"`}
    >
      <div className="modal-content">
        <button className="close" onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;