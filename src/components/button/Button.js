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
  const mouseEnter = () => {
    if (disabled) {
      setIsHovered(false);
    } else {
      setIsHovered(true);
    }
  };
  const mouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <button
      type={type || "button"}
      className={`${btnStyle ? btnStyle : "primary"} ${"" || size}`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      {...(disabled && { disabled: true })}
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
