import React from "react";
import Modal from "../../components/modal/Modal";

const Index = ({ modal, closeModal, title, isStatic, user }) => {
  return (
    <Modal
      isOpen={modal}
      onClose={closeModal}
      title={title}
      isStatic={isStatic}>
      <span>Are you sure you want to remove this user?</span>
    </Modal>
  );
};

export default Index;
