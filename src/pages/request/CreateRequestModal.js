import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import useCreateRequest from "../../hooks/requests/useCreateRequest";
import useFetchPhysicians from "../../hooks/requests/useFetchPhysicians";

const Index = ({ modal, closeModal, title, isStatic, refreshList }) => {
  const { user } = useAuthContext();
  const { physicians } = useFetchPhysicians();
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
      patientName: data?.patientName,
      age: data?.age,
      sex: data?.sex,
      diagnosis: data?.diagnosis,
      requestorId: user?.id,
      rtId: data?.rtId,
      status: 1,
    };

    await handleCreateRequest(requestData);

    if (!error) {
      setTimeout(() => {
        refreshList();
        closeModal();
        onSubmitLoading(e);
        e.target.reset();
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
      <div className="row gap-3">
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
          <div className="col ">
            <input
              type="text"
              name="patientName"
              className="form-input col-12"
              placeholder="fullname"
              defaultValue=""
              required
            />
          </div>
          <div className="d-flex gap-2 col ">
            <input
              type="text"
              name="age"
              placeholder="age"
              className="form-input col"
              defaultValue=""
              required
            />
            <input
              type="text"
              name="sex"
              placeholder="sex"
              className="form-input col"
              defaultValue=""
              required
            />
          </div>
        </div>
        <div className="input-container">
          <div className="row gap-1">
            <span className="input-title">Assign Respiratory Therapists</span>
            <select name="rtId" className="form-input" defaultValue="" required>
              <option disabled>Select a physician</option>
              {physicians?.map((user, index) => {
                return (
                  <option key={index} value={user?.id}>
                    {user?.employee_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
