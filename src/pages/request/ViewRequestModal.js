import React, { useEffect, useMemo, useState } from "react";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import rightIcon from "../../assets/icons/chevron-right.svg";
import OCR from "./OCR";
import useFormattedDate from "../../hooks/useFormattedDate";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import useFetchPhysicians from "../../hooks/requests/useFetchPhysicians";
import useFetchRequests from "../../hooks/requests/useFetchRequests";
import { renderToString } from "react-dom/server";

const ViewRequestModal = ({ modal, closeModal, title, isStatic, data }) => {
  const { physicians, fetchAssignee } = useFetchPhysicians();
  const { requests } = useFetchRequests();
  return (
    <Modal
      isOpen={modal}
      onClose={closeModal}
      title={`${title} - ${
        data?.status == 0
          ? "Pending"
          : data?.status == 1
          ? "In-progress"
          : "For Releasing"
      } `}
      isStatic={isStatic}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      submitLabel={"Send to physician"}>
      <div className="row gap-3">
        <div className="d-flex gap-3 p-0 m-0" style={{ overflowX: "auto" }}>
          <div className="req-card input-container ">
            <span className="col-auto">
              <Button icon={rightIcon} btnStyle={"next"} />
            </span>
            <div className="input-title col-auto">
              Scan & Upload ABG Results
            </div>
          </div>
          <div className="req-card input-container ">
            <span className="col-auto">
              <Button icon={rightIcon} btnStyle={"next"} />
            </span>
            <div className="input-title col-auto">
              View Supporting documents
            </div>
          </div>
          <div className="req-card input-container ">
            <span className="col-auto">
              <Button
                icon={rightIcon}
                btnStyle={"next"}
                onClick={() => {
                  OCR({ requestId: data?.id, requestorId: data?.requestor_id });
                  alert(
                    "Request ID: " +
                      data?.id +
                      "\nRequestor ID: " +
                      data.requestor_id
                  );
                }}
              />
            </span>
            <div className="input-title col-auto">
              View ABG Medical Information
            </div>
          </div>
        </div>
        <div className="input-container">
          <span className="fs-4 bold">
            {useFormattedDate(data?.date_created)}
          </span>
          <span className="fs-sm capitalized">
            {data?.sex || "No specified gender"} <span className="">🞄</span>
            {` ${data?.age} years old`}
          </span>
        </div>
        <div className="input-container">
          <span className="fs-4 bold">Assigned Respiratory Therapist</span>
          <span>
            {physicians?.find(
              (phy) => parseInt(phy.id) === parseInt(data?.rt_id)
            )?.employee_name || "No Assignee"}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default ViewRequestModal;
