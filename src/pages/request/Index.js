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

const Request = () => {
  const { user } = useAuthContext();
  const { requests, fetchRequests } = useFetchRequests();
  const [activeButton, setActiveButton] = useState(null);
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
  const isStatusEmpty =
    requests?.filter((req) =>
      activeButton === null ? true : req.status === activeButton
    ).length === 0;
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
      <div className="row gap-1 mt-1">
        {isFilteredEmpty && search ? (
          <span className="p-2">There is no user, keep searching</span>
        ) : filteredRequest.length ? (
          filteredRequest.map((req, index) => (
            <UserCard
              key={index}
              name={`${req?.patient_name} `}
              age={req?.age}
              status={req?.status}
              date={req?.date_created}
              onClick={() => {
                setSelectedRequest(req);
                setViewRequestModal(true);
              }}
            />
          ))
        ) : (
          <span className="p-2">
            {activeButton === null
              ? "There are no requests"
              : activeButton === 0
              ? "There are no pending requests for today"
              : activeButton === 1
              ? "There are no requests in-progress for today"
              : activeButton === 2
              ? "There are no requests for release today"
              : ""}
          </span>
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
