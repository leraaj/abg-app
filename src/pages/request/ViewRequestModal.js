import React, { useEffect, useMemo, useState } from "react";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import rightIcon from "../../assets/icons/chevron-right.svg";
import OCR from "./OCR";
import useFormattedDate from "../../hooks/useFormattedDate";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import useFetchRT from "../../hooks/requests/useFetchRT";
import useFetchRequests from "../../hooks/requests/useFetchRequests";
import useFetchUserPosition from "../../hooks/auth/useFetchUserPosition";
import useFetchPhysician from "../../hooks/requests/useFetchPhysicians";

const ViewRequestModal = ({ modal, closeModal, title, isStatic, data }) => {
  const { user } = useAuthContext();
  const { position } = useFetchUserPosition();
  const { rt } = useFetchRT();
  const { physicians } = useFetchPhysician();
  const { requests } = useFetchRequests();
  const isRespiratoryTherapist = position?.id === 2;
  const isPhysician = position?.id === 3;
  const patientsTherapist =
    rt?.find((phy) => parseInt(phy.id) === parseInt(data?.rt_id))
      ?.employee_name || "No Assignee";

  const patientStatus =
    data?.status === 0
      ? "Pending"
      : data?.status === 1
      ? "In-progress"
      : "For Releasing";
  const patientSex = data?.sex || "No specified gender";

  return (
    <Modal
      isOpen={modal}
      onClose={closeModal}
      closeLabel={"Close"}
      title={`${title} - ${patientStatus} `}
      isStatic={isStatic}
      {...(isRespiratoryTherapist && {
        onSubmit: (e) => {
          e.preventDefault();
        },
        submitLabel: "Send to physician",
      })}>
      <div className={`row gap-3`}>
        {isRespiratoryTherapist && (
          <div className={`d-flex overflow-x-auto gap-3 p-0 m-0 `}>
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
                <span>View Supporting documents</span>
              </div>
            </div>
            <div className="req-card input-container ">
              <span className="col-auto">
                <Button
                  icon={rightIcon}
                  btnStyle={"next"}
                  onClick={() => {
                    OCR({
                      requestId: data?.id,
                      requestorId: data?.requestor_id,
                    });
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
        )}
        <div className="input-container gap-1">
          <span className="req-title ">
            {useFormattedDate(data?.date_created)}
          </span>
          <span
            className="text-secondary capitalized"
            style={{ fontSize: "0.8rem" }}>
            {patientSex} <span className="">🞄</span>
            {` ${data?.age} years old`}
          </span>
        </div>
        <div className="input-container gap-0">
          <span className="req-title">{patientsTherapist}</span>
          <span className="text-secondary" style={{ fontSize: "0.8rem" }}>
            Assigned Respiratory Therapist
          </span>
        </div>
        {isRespiratoryTherapist && (
          <div className="input-container">
            <span className="req-title ">Assigned Physician</span>
            <div class="form-floating">
              <select
                name="rtId"
                className="form-select"
                defaultValue={user?.physician_id}
                required>
                <option disabled selected>
                  Select a physician
                </option>
                {physicians?.map((user, index) => {
                  return (
                    <option key={index} value={user?.id}>
                      {user?.employee_name}
                    </option>
                  );
                })}
              </select>
              <label for="floatingSelect">Physician</label>
            </div>
          </div>
        )}
        {isPhysician && (
          <>
            <div className="card flex-row align-items-center gap-0">
              <div
                className="col m-0 p-0 text-start gap-1"
                style={{ display: "flex", flexDirection: "column" }}>
                <span className="req-title">Supporting Documents</span>
                <span className="text-secondary" style={{ fontSize: "0.8rem" }}>
                  Test Results (static)
                </span>
                <div className="col-auto">
                  <span className="card-status">Pending (static)</span>
                </div>
              </div>
              <div className="col-auto">
                <span className="col-auto">
                  <Button icon={rightIcon} btnStyle={"next"} />
                </span>
              </div>
            </div>
            <div className="card flex-row align-items-center gap-0">
              <div
                className="col m-0 p-0 text-start gap-1"
                style={{ display: "flex", flexDirection: "column" }}>
                <span className="req-title">Reports</span>
                <div className="col-auto">
                  <span className="card-status">Pending (static)</span>
                </div>
              </div>
              <div className="col-auto">
                <span className="col-auto">
                  <Button icon={rightIcon} btnStyle={"next"} />
                </span>
              </div>
            </div>
            <div className="row m-0 p-0 col-12 gap-3">
              <button
                type="button"
                className="button secondary-outline rounded-3 col">
                <span className="secondary-outline-label">Reject</span>
              </button>
              <button type="button" className="button primary rounded-3 col">
                <span className="primary-label">Approve</span>
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ViewRequestModal;
