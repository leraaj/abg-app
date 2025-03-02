import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import useFetchPositions from "../../hooks/auth/useFetchPositions";
import useCreateRequest from "../../hooks/requests/useCreateRequest";

const Index = ({ modal, closeModal, title, isStatic }) => {
  const { handleCreateRequest, isLoading, error } = useCreateRequest();
  const [submitLoading, setSubmitLoading] = useState(false);

  const onSubmitLoading = (e) => {
    if (!isLoading) {
      setSubmitLoading(false);
    }
  };

  const onSubmit = async (e) => {
    setSubmitLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const requestData = {
      patientName: data.patientName,
      age: data.age,
      sex: data.sex,
      diagnosis: data.diagnosis,
      requestorId: data.requestorId,
      status: data.status,
    };

    await handleCreateRequest(requestData);

    if (!error) {
      setTimeout(() => {
        e.target.reset();
        closeModal();
        // addRequest(newUser);
        onSubmitLoading(e);
      }, 3000);
    }
  };

  return (
    <Modal
      isOpen={modal}
      onClose={closeModal}
      title={title}
      isStatic={isStatic}
      onSubmit={onSubmit}
      submitLoading={submitLoading}>
      <div className="row gap-1">
        <div className="input-container">
          <span className="input-title">diagnosis</span>
          <input
            type="text"
            name="diagnosis"
            placeholder="Specify"
            className="form-input"
            defaultValue=""
            required
          />
        </div>
        <div className="input-container">
          <span className="input-title">patient information</span>
          <input
            type="text"
            name="patientName"
            className="form-input"
            placeholder="fullname"
            defaultValue=""
            required
          />
          <div className="d-flex gap-1">
            <input
              type="text"
              name="age"
              placeholder="age"
              className="form-input"
              defaultValue=""
              required
            />
            <input
              type="text"
              name="sex"
              placeholder="sex"
              className="form-input"
              defaultValue=""
              required
            />
          </div>
        </div>
        <div className="input-container">
          <div className="row gap-1">
            <span className="input-title">Assignee</span>
            <select
              type="password"
              name="requestorId"
              className="form-input"
              defaultValue=""
              required>
              <option value="1">Physician</option>
            </select>
            {/* <span className="input-title">status</span>
            <input
              type="password"
              name="status"
              className="form-input"
              defaultValue=""
              required
            /> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
