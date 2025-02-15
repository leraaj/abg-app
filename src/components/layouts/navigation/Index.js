import React, { useState } from "react";
import "./navbar.css";
import logo from "../../../assets/brand/brand.png";
import notifOutline from "../../../assets/icons/bell-regular.svg";
import notifFill from "../../../assets/icons/bell-solid.svg";
import Button from "../../button/Button";

const Navbar = () => {
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
        <span>John Doe</span>
      </div>
    </div>
  );
};

export default Navbar;
