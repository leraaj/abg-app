import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import useFetchPositions from "../../hooks/auth/useFetchPositions";
import Button from "../../components/button/Button";
import useUpdateUser from "../../hooks/users/useUpdateUser";

const Index = ({ modal, closeModal, title, isStatic, user, updateUser }) => {
  const { handleUserUpdate, isLoading, error } = useUpdateUser();
  const { positions } = useFetchPositions();
  const [submitLoading, setSubmitLoading] = useState(false);
  const onSubmitLoading = (e) => {
    if (!isLoading) {
      setSubmitLoading(false);
    }
  };
  const onSubmit = async (e) => {
    setSubmitLoading(true);
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
      const newData = {
        employee_name: data.employeeName,
        employee_number: data.employeeNumber, // Ensure this matches the memoized data structure
        username: data.username,
        position_id: parseInt(data.positionId, 10), // Convert to integer
      };

      if (!error) {
        setTimeout(() => {
          e.target.reset();
          closeModal();
          handleUserUpdate(user?.id, data);
          updateUser(user?.id, newData);
          onSubmitLoading();
        }, 3000);
      }
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
        <span className="header-title">Profile Information</span>
        <div className="input-container">
          <span className="input-title">Employee name</span>
          <input
            type="text"
            name="employeeName"
            className="form-control"
            defaultValue={user?.employee_name || ""}
          />
          <span className="input-title">Employee number</span>
          <input
            type="text"
            name="employeeNumber"
            className="form-control"
            defaultValue={user?.employee_number || ""}
          />
        </div>
        <span className="header-title">Access Credentials</span>
        <div className="input-container">
          <span className="input-title">Username</span>
          <input
            type="text"
            name="username"
            className="form-control"
            defaultValue={user?.username || ""}
          />
          {/* <div className="row gap-1">
            <span className="input-title">Password</span>
            <input
              type="password"
              name="password"
              className="form-control"
              defaultValue={user?.password || ""}
            />
          </div> */}

          <span className="input-title">Position</span>
          <select
            name="positionId"
            className="form-control"
            defaultValue={user?.position_id || ""}>
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
