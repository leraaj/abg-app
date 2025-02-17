import React, { useState } from "react";
import "./request.css";
import addIcon from "../../assets/icons/plus.svg";
import Button from "../../components/button/Button";
import UserCard from "../../components/card/UserCard";
const Request = () => {
  const [activeButton, setActiveButton] = useState("pending");
  const handleToggle = (button) => {
    setActiveButton(button);
  };

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="container">
      <div className="col">
        <div className="d-flex gap-1">
          <div className="col">
            <input
              type="search"
              className="form-control search-bar"
              onChange={handleSearch}
              placeholder="Search patient code"
              style={{ borderRadius: "1.5rem" }}
            />
          </div>
          <div className="col-auto">
            <Button
              label={"Request"}
              btnStyle={"light"}
              borderRadius={"1rem"}
              icon={addIcon}
            />
          </div>
        </div>
      </div>
      <div className="d-flex gap-1 mt-1">
        <Button
          label={"All"}
          btnStyle={activeButton === "all" ? "secondary" : "light"}
          borderRadius={"1rem"}
          onClick={() => handleToggle("all")}
        />
        <Button
          label={"Pending"}
          btnStyle={activeButton === "pending" ? "secondary" : "light"}
          borderRadius={"1rem"}
          onClick={() => handleToggle("pending")}
        />
        <Button
          label={"For Releasing"}
          btnStyle={activeButton === "releasing" ? "secondary" : "light"}
          borderRadius={"1rem"}
          onClick={() => handleToggle("releasing")}
        />
      </div>
      <div className="row gap-1 mt-1">
        <UserCard name={"John Doe"} date={"FEB-18-2025"} status={"Pending"} />
        <UserCard name={"Dwin Cruz"} date={"FEB-18-2025"} status={"Pending"} />
        <UserCard
          name={"Sam Will Smith"}
          date={"FEB-18-2025"}
          status={"Pending"}
        />
      </div>
    </div>
  );
};

export default Request;
