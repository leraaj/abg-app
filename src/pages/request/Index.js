import React, { useState } from "react";
import "./request.css";
import addIcon from "../../assets/icons/plus.svg";
import Button from "../../components/button/Button";
import UserCard from "../../components/card/UserCard";
import InternalHeader from "../../components/layouts/InternalLayout/InternalHeader";
import CreateRequestModal from "./CreateRequestModal";
import useFetchRequests from "../../hooks/requests/useFetchRequests";
import ViewRequestModal from "./ViewRequestModal";

const Request = () => {
  const { requests } = useFetchRequests();
  const [activeButton, setActiveButton] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [search, setSearch] = useState("");

  const handleToggle = (button) => {
    setActiveButton(button);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredRequests = requests.filter((req) => {
    if (activeButton === "") return true;
    return req.status === activeButton;
  });

  // MODALS
  const [createRequestModal, setCreateRequestModal] = useState(false);
  const [viewRequestModal, setViewRequestModal] = useState(false);
  return (
    <>
      <InternalHeader>
        <div className="row col gap-1">
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
                onClick={() => setCreateRequestModal(true)}
              />
            </div>
          </div>
          <div className="d-flex gap-1 ">
            <Button
              label={"All"}
              btnStyle={activeButton === "" ? "secondary" : "light"}
              borderRadius={"1rem"}
              onClick={() => handleToggle("")}
            />
            <Button
              label={"Pending"}
              btnStyle={activeButton === 1 ? "secondary" : "light"}
              borderRadius={"1rem"}
              onClick={() => handleToggle(1)}
            />
            <Button
              label={"For Releasing"}
              btnStyle={activeButton === 2 ? "secondary" : "light"}
              borderRadius={"1rem"}
              onClick={() => handleToggle(2)}
            />
          </div>
        </div>
      </InternalHeader>
      <div className="row gap-1 mt-1">
        {filteredRequests.length ? (
          filteredRequests.map((req, index) => (
            <UserCard
              key={index}
              name={req?.patient_name}
              age={req?.age}
              status={req?.status}
              date={req?.date}
              onClick={() => {
                setSelectedRequest(req);
                setViewRequestModal(true);
              }}
            />
          ))
        ) : (
          <p>No requests, create a request</p>
        )}
        {/* {JSON.stringify(requests)} */}
      </div>
      <CreateRequestModal
        modal={createRequestModal}
        closeModal={() => setCreateRequestModal(false)}
        title="Create Request"
        isStatic={true}
      />
      <ViewRequestModal
        modal={viewRequestModal}
        closeModal={() => setViewRequestModal(false)}
        title="View Request"
        isStatic={false}
        data={selectedRequest}
      />
    </>
  );
};

export default Request;
