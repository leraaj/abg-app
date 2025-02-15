import React, { useContext, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./btnStyles.css";
const Button = ({ label, icon, iconHovered, onClick }) => {
  const { toggle, toggler } = useAuthContext();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      type="button"
      className="btn"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}>
      {icon && (
        <img
          src={isHovered ? icon : iconHovered}
          height={15}
          className="btn-icon"
        />
      )}
      {label && <span className="btn-label">{label}</span>}
    </button>
  );
};

export default Button;
