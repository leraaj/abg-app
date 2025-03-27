import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import useFetchPositions from "../../hooks/auth/useFetchPositions";
import useCreateUser from "../../hooks/users/useCreateUser";

const Index = ({ modal, closeModal, title, isStatic, fetchUsers }) => {
  const { positions } = useFetchPositions();
  const { handleCreateUser, isLoading, error } = useCreateUser();
  const [submitLoading, setSubmitLoading] = useState(false);

  const onSubmitLoading = (e) => {
    if (!isLoading) {
      setSubmitLoading(false);
    }
  };

  const onSubmit = async (e) => {
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
    setSubmitLoading(true);
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
      fetchUsers();
      setTimeout(() => {
        e.target.reset();
        closeModal();
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
      onSubmit={(e) => onSubmit(e)}
      submitLoading={submitLoading}>
      <div className="row gap-3">
        <div className="input-container">
          <span className="input-title">Profile Information</span>
          <div class="form-floating">
            <input
              type="text"
              name="employeeName"
              placeholder="Employee name"
              className="form-control"
              defaultValue=""
              required
            />
            <label for="floatingSelect">Employee name</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              name="employeeNumber"
              placeholder="Employee number"
              className="form-control"
              defaultValue=""
              required
            />
            <label for="floatingSelect">Employee number</label>
          </div>
        </div>
        <div className="input-container">
          <span className="input-title">Access Credentials</span>
          <div class="form-floating">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-control"
              defaultValue=""
              required
            />
            <label for="floatingSelect">Username</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              defaultValue=""
              required
            />

            <label for="floatingSelect">Password</label>
          </div>
          <div class="form-floating">
            <select name="positionId" className="form-select" required>
              <option disabled selected>
                Select user position
              </option>
              {positions?.map((pos) => (
                <option key={pos?.id} value={pos?.id}>
                  {pos?.type}
                </option>
              ))}
            </select>
            <label for="floatingSelect">Position</label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
