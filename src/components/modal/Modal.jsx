import React, { useEffect } from "react";
import "./modal.css";
import Button from "../button/Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  isStatic = false,
  onSubmit,
  submitLabel,
  submitLoading,
  closeLabel,
  modalSize,
}) => {
  useEffect(() => {
    if (!isStatic) {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isStatic, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={!isStatic ? onClose : undefined}>
      <div
        className={`modal-container col col-sm col-md-7 col-lg-6`}
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>{title || "No title"}</h2>
          <span onClick={onClose} className="modal-close">
            &times;
          </span>
        </div>

        <form onSubmit={onSubmit}>
          {/* Body */}
          <div className="modal-body">{children}</div>

          {/* Footer */}
          <div className="modal-footer d-flex gap-1">
            {footer || (
              <button type={"button"} className="cancel-btn" onClick={onClose}>
                {closeLabel || `Cancel`}
              </button>
            )}
            {onSubmit && onSubmit != false && (
              <Button
                type={"submit"}
                btnStyle={"primary"}
                borderRadius={"0.4rem"}
                label={
                  submitLabel
                    ? submitLabel
                    : submitLoading
                    ? "Loading"
                    : "Apply changes"
                }
                disabled={submitLoading && true}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
