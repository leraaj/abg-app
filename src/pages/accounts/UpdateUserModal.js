import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import useFetchPositions from "../../hooks/auth/useFetchPositions";
import Button from "../../components/button/Button";
import useUpdateUser from "../../hooks/users/useUpdateUser";

const Index = ({ modal, closeModal, title, isStatic, user, fetchUsers }) => {
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
          fetchUsers();
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
      onSubmit={(e) => onSubmit(e)}
      submitLoading={submitLoading}>
      <div className="row gap-3">
        <div className="input-container">
          <span className="input-title">Profile Information</span>
          <div class="form-floating">
            <input
              type="text"
              name="employeeName"
              className="form-control"
              defaultValue={user?.employee_name || ""}
            />
            <label for="floatingInput">Employee name</label>
          </div>

          <div class="form-floating">
            <input
              type="text"
              name="employeeNumber"
              placeholder="Employee number"
              className="form-control"
              defaultValue={user?.employee_number || ""}
            />
            <label for="floatingInput">Employee number</label>
          </div>
        </div>
        <span className="header-title">Access Credentials</span>
        <div className="input-container">
          <div class="form-floating">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-control"
              defaultValue={user?.username || ""}
            />
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating">
            <select
              name="positionId"
              className="form-select"
              defaultValue={user?.position_id || ""}>
              <option disabled>Select user position</option>
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
