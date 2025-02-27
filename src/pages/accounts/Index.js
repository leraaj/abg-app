import React, { useMemo, useState } from "react";
import useFetchUsers from "../../hooks/useFetchUsers";
import useFetchPositions from "../../hooks/useFetchPositions";
import Button from "../../components/button/Button";
import addIcon from "../../assets/icons/plus.svg";
import InternalHeader from "../../components/layouts/InternalLayout/InternalHeader";
import MaterialTable from "../../components/table/MaterialTable";
import UpdateUserModal from "../accounts/UpdateUserModal.js";
import DeleteUserModal from "../accounts/DeleteUserModal.js";
const Index = () => {
  const { users, isLoading: userLoading } = useFetchUsers();
  const { positions, isLoading: positionsLoading } = useFetchPositions();
  const [selectedUser, setSelectedUser] = useState([]);
  const data = useMemo(() => {
    if (!users) return [];

    return users.map((user) => {
      const position = positions.find((pos) => pos?.id === user?.position_id);

      return {
        id: user?.id,
        employee_name: user?.employee_name,
        employee_number: user?.employee_number,
        username: user?.username,
        password: user?.password,
        position_id: user?.position_id,
        position_type: position?.type,
      };
    });
  }, [users]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "employee_name",
        header: "Employee Name",
      },
      {
        accessorKey: "employee_number",
        header: "Employee Number",
      },
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "position_type",
        header: "Position",
        filterVariant: "multi-select",
        filterSelectOptions: positions?.map((pos) => pos?.type) || [],
      },
    ],
    [users]
  );
  // UPDATE USER MODAL
  const [updateUserModal, setUpdateUserModal] = useState(false);
  const openUpdateUserModal = () => setUpdateUserModal(true);
  const closeUpdateUserModal = () => setUpdateUserModal(false);
  // UPDATE USER MODAL
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const openDeleteUserModal = () => setDeleteUserModal(true);
  const closeDeleteUserModal = () => setDeleteUserModal(false);
  return (
    <>
      {/* <InternalHeader flexPosition={"right"}>
        <div className="col-auto">
          <Button
            label={"Create User"}
            btnStyle={"light"}
            borderRadius={"1rem"}
            icon={addIcon}
          />
        </div>
      </InternalHeader> */}
      <div className="mt-2">
        <MaterialTable
          data={data}
          columns={columns}
          enableLoading={userLoading || positionsLoading}
          renderRowActions={({ row }) => (
            <div className={"d-flex gap-1"}>
              <Button
                label={"Update"}
                btnStyle={"light"}
                borderRadius={"1rem"}
                onClick={() => {
                  openUpdateUserModal();
                  setSelectedUser(row.original);
                }}
              />
              <Button
                label={"Remove"}
                btnStyle={"light"}
                borderRadius={"1rem"}
                onClick={() => {
                  openDeleteUserModal();
                  setSelectedUser(row.original);
                }}
              />
            </div>
          )}
          renderTopToolbarCustomActions={() => (
            <>
              <Button
                label={"Create User"}
                btnStyle={"light"}
                borderRadius={"1rem"}
                icon={addIcon}
              />
            </>
          )}
        />
      </div>
      <UpdateUserModal
        modal={updateUserModal}
        closeModal={closeUpdateUserModal}
        title={`Update User - ${selectedUser?.employee_name}`}
        isStatic={true}
        user={selectedUser}
      />
      <DeleteUserModal
        modal={deleteUserModal}
        closeModal={closeDeleteUserModal}
        title={`Delete User - ${selectedUser?.employee_name}`}
        isStatic={false}
        user={selectedUser}
      />
    </>
  );
};

export default Index;
