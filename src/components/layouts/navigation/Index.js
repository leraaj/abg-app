import React, { useState } from "react";
import "./navbar.css";
import logo from "../../../assets/brand/brand.png";
import notifFill from "../../../assets/icons/bell-regular.svg";
import notifOutline from "../../../assets/icons/bell-solid.svg";
import Button from "../../button/Button";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  return (
    <div className="navigation-bar">
      <div className="left">
        <span className="brand">
          <img src={logo} alt="logo" height={55} />
        </span>
        <span className="brand-name">ABG requests</span>
      </div>
      <div className="right">
        <Button icon={notifFill} iconHovered={notifOutline} />
        <span>{user?.username || "No user"}</span>
      </div>
    </div>
  );
};

export default Navbar;
