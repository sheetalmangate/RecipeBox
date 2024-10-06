interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  buttonText: string;
  handleClick: () => void;
}

const Modal = ({ children, isOpen, handleClose, title, buttonText, handleClick }:ModalProps) => {
    return (
      <div
        tabIndex={-1}
        role="dialog"
        className={isOpen ? "modal d-inline" : "modal d-none"}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>{children}</div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
              >
                {buttonText}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Modal;