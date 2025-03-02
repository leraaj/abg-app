import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import useFetchPositions from "../../hooks/auth/useFetchPositions";
import useCreateUser from "../../hooks/users/useCreateUser";

const Index = ({ modal, closeModal, title, isStatic, addUser }) => {
  const { positions } = useFetchPositions();
  const { handleCreateUser, isLoading, error } = useCreateUser();
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

    const positionId = parseInt(data.positionId, 10);

    const requiredFields = [
      "employeeName",
      "employeeNumber",
      "username",
      "password",
      "positionId",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !data[field] || data[field].toString().trim() === ""
    );

    if (emptyFields.length > 0) {
      alert(`Please fill in all required fields: ${emptyFields.join(", ")}`);
      return;
    }

    const newUser = {
      id: Date.now(), // Temporary unique ID until the backend assigns one
      employee_name: data.employeeName,
      employee_number: data.employeeNumber,
      username: data.username,
      password: data.password,
      position_id: positionId,
      position_type:
        positions.find((pos) => pos.id === positionId)?.type || "Unknown",
    };

    await handleCreateUser({
      employeeName: data.employeeName,
      employeeNumber: data.employeeNumber,
      username: data.username,
      password: data.password,
      positionId: parseInt(positionId, 10),
    });

    if (!error) {
      setTimeout(() => {
        e.target.reset();
        closeModal();
        addUser(newUser);
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
        <span className="header-title">Profile Information</span>
        <div className="d-flex gap-1">
          <div className="input-container">
            <span className="input-title">Employee name</span>
            <input
              type="text"
              name="employeeName"
              className="form-input"
              defaultValue=""
              required
            />
          </div>

          <div className="input-container">
            <span className="input-title">Employee number</span>
            <input
              type="text"
              name="employeeNumber"
              className="form-input"
              defaultValue=""
              required
            />
          </div>
        </div>
        <span className="header-title">Access Credentials</span>
        <div className="input-container">
          <span className="input-title">Username</span>
          <input
            type="text"
            name="username"
            className="form-input"
            defaultValue=""
            required
          />
          <div className="row gap-1">
            <span className="input-title">Password</span>
            <input
              type="password"
              name="password"
              className="form-input"
              defaultValue=""
              required
            />
          </div>

          <span className="input-title">Position</span>
          <select
            name="positionId"
            className="form-input"
            defaultValue={0}
            required>
            <option value={0} disabled>
              Select user position
            </option>
            {positions?.map((pos) => (
              <option key={pos?.id} value={pos?.id}>
                {pos?.type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
