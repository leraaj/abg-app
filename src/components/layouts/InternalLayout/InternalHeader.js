import React from "react";

const InternalHeader = ({ children, flexPosition }) => {
  return (
    <div className={`internal-header justify-${flexPosition || "start"}`}>
      {children}
    </div>
  );
};

export default InternalHeader;
