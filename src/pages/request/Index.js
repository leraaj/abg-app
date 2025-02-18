import React, { useState } from "react";
import "./request.css";
import addIcon from "../../assets/icons/plus.svg";
import Button from "../../components/button/Button";
import UserCard from "../../components/card/UserCard";
import requests from "./sampleRequest";

const Request = () => {
  const [activeButton, setActiveButton] = useState("pending");
  const [search, setSearch] = useState("");

  const handleToggle = (button) => {
    setActiveButton(button);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredRequests = requests.filter((req) => {
    if (activeButton === "all") return true;
    return req.status === activeButton;
  });

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
        {filteredRequests.map((req) => (
          <UserCard
            key={req.name}
            name={req.name}
            date={req.date}
            status={req.status}
          />
        ))}
      </div>
    </div>
  );
};

export default Request;
