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
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>{title || "No title"}</h2>
          <button type="button" onClick={onClose} className="modal-close">
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit}>
          {/* Body */}
          <div className="modal-body">{children}</div>

          {/* Footer */}
          <div className="modal-footer d-flex gap-1">
            {footer || (
              <button type={"button"} className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            )}
            {onSubmit && (
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
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
