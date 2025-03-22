import React from "react";

const InternalHeader = ({ children, flexPosition }) => {
  return (
    <div
      className={`internal-header justify-content-${
        flexPosition || "start"
      } gap-3`}>
      {children}
    </div>
  );
};

export default InternalHeader;
