import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import rightIcon from "../../assets/icons/chevron-right.svg";
import UserCard from "../../components/card/UserCard";
import OCR from "./OCR";

const ViewRequestModal = ({ modal, closeModal, title, isStatic, data }) => {
  return (
    <Modal
      isOpen={modal}
      onClose={closeModal}
      title={`${title} - ${data?.status == 1 ? "Pending" : "For Releasing"} `}
      isStatic={isStatic}
      onSubmit={{}}
      submitLabel={"Send to physician"}>
      <div className="row gap-1">
        <div className="d-flex gap-1">
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
                onClick={() => OCR(data?.id, data?.requestor_id)}
              />
            </span>
            <div className="input-title col-auto">
              View ABG Medical Information
            </div>
          </div>
        </div>
        <div className="input-container">
          <span className="header-title">{data?.date || "XXX-XX-XXXX"}</span>
          <span className="d-flex gap-1 f4 input-title">
            {data?.sex || "No specified gender"} - {`${data?.age} years old`}
          </span>
        </div>
        <div className="input-container">
          <span className="header-title">{data?.date || "XXX-XX-XXXX"}</span>
          <span className="row gap-1 f4 input-title">
            <span>{data?.assignee_id || "No assignee"}</span>
            <span>Assignee Physician</span>
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default ViewRequestModal;
