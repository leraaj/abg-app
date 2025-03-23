import React, { useContext, useState } from "react";
import "./btnStyles.css";
const Button = ({
  btnStyle,
  borderRadius,
  label,
  icon,
  iconHovered,
  onClick,
  type,
  disabled,
  size,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      type={type || "button"}
      className={`${btnStyle || "primary"} ${"" || size}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || false}
      onClick={onClick || undefined}
      style={{ borderRadius: borderRadius || "0.8rem" }}>
      {icon && (
        <img
          src={
            icon && !iconHovered ? icon : icon && isHovered ? iconHovered : icon
          }
          height={15}
          className={`${btnStyle || "primary"}-icon`}
          style={{ paddingInlineEnd: icon && label && "0.2rem" }}
        />
      )}
      {label && (
        <span className={`${btnStyle || "primary"}-label`}>{label}</span>
      )}
    </button>
  );
};

export default Button;
