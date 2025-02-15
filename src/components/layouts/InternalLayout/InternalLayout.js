import React from "react";
import { Outlet } from "react-router-dom";
import "./layout.css";
import NavBar from "../navigation/Index";

const InternalLayout = () => {
  return (
    <div className="internal-layout">
      {/*Nav*/}
      <NavBar />
      {/*Content*/}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default InternalLayout;
