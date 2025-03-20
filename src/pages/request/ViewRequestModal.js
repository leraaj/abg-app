import React, { useEffect, useMemo, useState } from "react";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import rightIcon from "../../assets/icons/chevron-right.svg";
import UserCard from "../../components/card/UserCard";
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
      title={`${title} - ${data?.status == 1 ? "Pending" : "For Releasing"} `}
      isStatic={isStatic}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      submitLabel={"Send to physician"}>
      <div className="row gap-1">
        <div
          className="d-flex gap-1"
          style={{ overflowX: "scroll", paddingBottom: "1rem" }}>
          <div className="input-container ">
            <span className="col-auto">
              <Button icon={rightIcon} btnStyle={"next"} />
            </span>
            <div className="input-title col-auto">
              Scan & Upload ABG Results
            </div>
          </div>
          <div className="input-container ">
            <span className="col-auto">
              <Button icon={rightIcon} btnStyle={"next"} />
            </span>
            <div className="input-title col-auto">
              View Supporting documents
            </div>
          </div>
          <div className="input-container ">
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
                  // console.log(data);
                }}
              />
            </span>
            <div className="input-title col-auto">
              View ABG Medical Information
            </div>
          </div>
        </div>
        <div className="input-container">
          <span className="f6">{useFormattedDate(data?.date_created)}</span>
          <span className="row gap-1 f4 input-title">
            <span>{data?.patient_name}</span>
            <span>
              {data?.sex || "No specified gender"} <span className="f4">🞄</span>
              {` ${data?.age} years old`}
            </span>
          </span>
        </div>
        <div className="input-container">
          <span className="row gap-1 f4 input-title">
            <span className="f6">
              {physicians?.find(
                (phy) => parseInt(phy.id) === parseInt(data?.rt_id)
              )?.employee_name || "No Assignee"}
            </span>
            <span>Assigned Physician</span>
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default ViewRequestModal;
