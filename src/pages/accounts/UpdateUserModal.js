import React from "react";
import Modal from "../../components/modal/Modal";
import useFetchUserPosition from "../../hooks/useFetchUserPosition";
import useFetchPositions from "../../hooks/useFetchPositions";
import Button from "../../components/button/Button";
import useUpdateUser from "../../hooks/useUpdateUser";

const Index = ({ modal, closeModal, title, isStatic, user }) => {
  const { handleUserUpdate, isLoading, error } = useUpdateUser();
  const { positions } = useFetchPositions();
  const { position } = useFetchUserPosition();
  const currentUserData = {
    employeeName: user?.employee_name,
    employeeNumber: user?.employee_number,
    username: user?.username,
    password: user?.password,
    positionId: position?.id, // Ensure comparison with integer
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // Convert position_id to an integer
    data.positionId = parseInt(data.positionId, 10);

    console.log("Parsed position_id:", data.positionId);

    // Prevent update if no fields have changed
    if (Object.keys(data).length === 0) {
      return console.log(data);
    } else {
      console.log(data);
      handleUserUpdate(user?.id, data);
    }
  };

  return (
    <Modal
      isOpen={modal}
      onClose={closeModal}
      title={title}
      isStatic={isStatic}
      onSubmit={onSubmit}
      submitLoading={isLoading}>
      <div className="row gap-1">
        <span className="input-title f6">Profile Information</span>
        <div className="d-flex gap-1">
          <div className="input-container">
            <span className="input-title">Employee name</span>
            <input
              type="text"
              name="employeeName"
              className="form-input"
              defaultValue={user?.employee_name || ""}
            />
          </div>
          <div className="input-container">
            <span className="input-title">Employee number</span>
            <input
              type="text"
              name="employeeNumber"
              className="form-input"
              defaultValue={user?.employee_number || ""}
            />
          </div>
        </div>

        <span className="input-title f6">Access Credentials</span>
        <div className="input-container">
          <div className="d-flex gap-1">
            <div className="row gap-1 col">
              <span className="input-title">Username</span>
              <input
                type="text"
                name="username"
                className="form-input"
                defaultValue={user?.username || ""}
              />
            </div>
            {/* <div className="row gap-1">
              <span className="input-title">Password</span>
              <input
                type="password"
                name="password"
                className="form-input"
                defaultValue={user?.password || ""}
              />
            </div> */}
          </div>

          <span className="input-title">Position</span>
          <select
            name="positionId"
            className="form-input"
            defaultValue={position?.id || 0}>
            <option value="0" disabled>
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
