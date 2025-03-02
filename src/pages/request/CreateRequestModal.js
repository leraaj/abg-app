import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import useCreateRequest from "../../hooks/requests/useCreateRequest";
import useFetchUsers from "../../hooks/useFetchUsers";

const Index = ({ modal, closeModal, title, isStatic }) => {
  const { user } = useAuthContext();
  const { users } = useFetchUsers();
  const currentPhysicians =
    users?.filter((user) => user?.position_id === 2) || [];
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
      requestorId: user?.id,
      status: 1,
      assigneeId: 1,
      // date: new Date().toISOString(),
    };
    console.log("Input Data: \n", requestData);
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
      submitLoading={submitLoading}
    >
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
          <div className="d-flex gap-1 col">
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
            <span className="input-title">Assignee</span>
            <select
              type="password"
              name="requestorId"
              className="form-input"
              defaultValue=""
              required
            >
              {/* <option disabled>Select a physician</option>
              {currentPhysicians?.map((user, index) => {
                return (
                  <option key={index} value={user?.id}>
                    {user?.employee_name}
                  </option>
                );
              })} */}
              <option value="1">Jane Doe</option>
              <option value="2">Katherine Miles</option>
              <option value="3">Warren Cruz</option>
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
