import React, { useState, useMemo, useEffect } from "react";
import "./request.css";
import addIcon from "../../assets/icons/plus.svg";
import Button from "../../components/button/Button";
import UserCard from "../../components/card/UserCard";
import InternalHeader from "../../components/layouts/InternalLayout/InternalHeader";
import CreateRequestModal from "./CreateRequestModal";
import useFetchRequests from "../../hooks/requests/useFetchRequests";
import ViewRequestModal from "./ViewRequestModal";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import useFetchUserPosition from "../../hooks/auth/useFetchUserPosition";

const Request = () => {
  const { user } = useAuthContext();
  const { requests, fetchRequests } = useFetchRequests();
  const [activeButton, setActiveButton] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [search, setSearch] = useState("");

  const handleToggle = (button) => {
    setActiveButton(button);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredRequest = useMemo(() => {
    return (
      requests
        ?.filter((req) => {
          if (activeButton === null) return true; // Show all requests when "All" is selected
          return req.status === activeButton;
        })
        .filter((req) =>
          req.patient_name?.toLowerCase().includes(search.toLowerCase())
        )
        // Sort by `date_created` in descending order (most recent first)
        .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
    );
  }, [requests, activeButton, search]); // Add `requests` to dependencies
  const isFilteredEmpty = filteredRequest.length === 0;
  const messages = {
    null: "No records found",
    0: "No pending requests at the moment",
    1: "No requests are currently in progress",
    2: "No requests are ready for release",
  };

  const messageFilters = messages[activeButton] ?? "";
  // MODALS
  const [createRequestModal, setCreateRequestModal] = useState(false);
  const [viewRequestModal, setViewRequestModal] = useState(false);

  return (
    <>
      <InternalHeader>
        <div className="col row gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="col">
              <input
                type="search"
                className="form-control search-bar"
                onChange={handleSearch}
                placeholder="Search patient code"
                style={{ borderRadius: "1.5rem" }}
              />
            </div>
            {user?.position_id === 1 && (
              <div className="col-auto d-flex gap-2">
                <Button
                  label={"Request"}
                  btnStyle={"light"}
                  borderRadius={"1rem"}
                  icon={addIcon}
                  onClick={() => setCreateRequestModal(true)}
                />
              </div>
            )}
          </div>
          <div className="d-flex gap-2">
            <Button
              label={"All"}
              btnStyle={activeButton == null ? "secondary" : "light"}
              borderRadius={"1rem"}
              onClick={() => handleToggle(null)}
            />
            <Button
              label={"Pending"}
              btnStyle={activeButton === 0 ? "secondary" : "light"}
              borderRadius={"1rem"}
              onClick={() => handleToggle(0)}
            />
            <Button
              label={"In-progress"}
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
      <div className="row gap-3 mt-1">
        {isFilteredEmpty && search ? (
          <span className="p-2">No matching records found</span>
        ) : filteredRequest.length ? (
          filteredRequest.map((req, index) => (
            <UserCard
              key={index}
              name={`${req?.patient_name} `}
              age={req?.age}
              status={req?.status}
              date={req?.date_created}
              diagnosis={req?.diagnosis}
              onClick={() => {
                setSelectedRequest(req);
                setViewRequestModal(true);
              }}
            />
          ))
        ) : (
          <span className="p-2">{messageFilters}</span>
        )}
      </div>
      <CreateRequestModal
        modal={createRequestModal}
        closeModal={() => {
          setCreateRequestModal(false);
          fetchRequests();
        }}
        title="Create Request"
        isStatic={true}
        refreshList={() => fetchRequests()}
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
