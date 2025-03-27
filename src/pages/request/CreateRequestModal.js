import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import useCreateRequest from "../../hooks/requests/useCreateRequest";
import useFetchRT from "../../hooks/requests/useFetchRT";
const Index = ({ modal, closeModal, title, isStatic, refreshList }) => {
  const { user } = useAuthContext();
  const { rt } = useFetchRT();
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
      onSubmit={(e) => onSubmit(e)}
      submitLoading={submitLoading}>
      <div className="row gap-3">
        <div className="input-container">
          <span className="input-title">diagnosis</span>
          <div class="form-floating">
            <input
              type="text"
              name="diagnosis"
              placeholder="Specify"
              className="form-control"
              defaultValue=""
              required
            />
            <label for="floatingInput">
              E.g., Respiratory Acidosis, Respiratory Alkalosis, Metabolic
              Acidosis, Mixed Respiratory and Metabolic Acidosis
            </label>
          </div>
        </div>
        <div className="input-container">
          <span className="input-title">patient information</span>
          <div class="form-floating">
            <input
              type="text"
              name="patientName"
              className="form-control col-12"
              placeholder="Fullname"
              defaultValue=""
              required
            />
            <label for="floatingInput">Fullname</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              name="age"
              placeholder="Age"
              className="form-control"
              defaultValue=""
              required
            />
            <label for="floatingInput">Age</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              name="sex"
              placeholder="Sex"
              className="form-control"
              defaultValue=""
              required
            />
            <label for="floatingInput">Sex</label>
          </div>
        </div>

        <div className="input-container">
          <span className="input-title">Assign Respiratory Therapists</span>
          <div class="form-floating">
            <select
              name="rtId"
              className="form-select"
              defaultValue={""}
              required>
              <option disabled selected>
                Select a respiratory therapist
              </option>
              {rt?.map((user, index) => {
                return (
                  <option key={index} value={user?.id}>
                    {user?.employee_name}
                  </option>
                );
              })}
            </select>
            <label for="floatingSelect">Respiratory Therapists</label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
