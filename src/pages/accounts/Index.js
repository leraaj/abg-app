import React, { useMemo, useState } from "react";
import useFetchUsers from "../../hooks/useFetchUsers";
import useFetchPositions from "../../hooks/auth/useFetchPositions";
import Button from "../../components/button/Button";
import addIcon from "../../assets/icons/plus.svg";
import MaterialTable from "../../components/table/MaterialTable";
import UpdateUserModal from "../accounts/UpdateUserModal.js";
import DeleteUserModal from "../accounts/DeleteUserModal.js";
import CreateUserModal from "../accounts/CreateUserModal.js";
import useDeleteUser from "../../hooks/users/useDeleteUser.js";
import updateIcon from "../../assets/icons/pen-solid.svg";
import deleteIcon from "../../assets/icons/trash-solid.svg";

const Index = () => {
  const { users, isLoading: userLoading, fetchUsers } = useFetchUsers();
  const {
    handleDeleteUser,
    error: deleteUserError,
    message: deleteUserMessage,
  } = useDeleteUser();
  const { positions, isLoading: positionsLoading } = useFetchPositions();

  const [selectedUser, setSelectedUser] = useState(null);

  // Memoized data with applied edits & created users
  const data = useMemo(() => {
    if (!users) return [];

    return users.map((user) => {
      const position = positions.find((pos) => pos?.id === user?.position_id);

      return {
        id: user?.id,
        employee_name: user?.employee_name, // Directly use user data
        employee_number: user?.employee_number, // Directly use user data
        username: user?.username, // Directly use user data
        password: user?.password, // Directly use user data
        position_id: user?.position_id, // Directly use user data
        position_type: position?.type, // Ensure correct type mapping
      };
    });
  }, [users, positions]); // Include `positions` dependency

  const columns = useMemo(
    () => [
      { accessorKey: "employee_name", header: "Employee Name" },
      { accessorKey: "employee_number", header: "Employee Number" },
      { accessorKey: "username", header: "Username" },
      {
        accessorKey: "position_type",
        header: "Position",
        filterVariant: "multi-select",
        filterSelectOptions: positions?.map((pos) => pos?.type) || [],
      },
    ],
    [users]
  );
  const handleDelete = async (user) => {
    const deleteId = user?.id;
    await handleDeleteUser(user.id); // Await the deletion before continuing

    if (!deleteUserError) {
      fetchUsers();
    } else {
      console.log(deleteUserMessage);
      alert("Failed to delete user");
    }
  };

  // Modals
  const [createUserModal, setCreateUserModal] = useState(false);
  const [updateUserModal, setUpdateUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);

  return (
    <>
      <div className="mt-2">
        <MaterialTable
          data={data}
          columns={columns}
          enableLoading={userLoading || positionsLoading}
          renderRowActions={({ row }) => (
            <div className={"d-flex"}>
              <Button
                size={"sm"}
                label={<img src={updateIcon} height={15} />}
                btnStyle={"light"}
                borderRadius={"1rem"}
                onClick={() => {
                  setSelectedUser(row.original);
                  setUpdateUserModal(true);
                }}
              />
              <Button
                size={"sm"}
                label={<img src={deleteIcon} height={15} />}
                btnStyle={"light"}
                borderRadius={"1rem"}
                onClick={() => {
                  handleDelete(row.original);
                  fetchUsers();
                }}
              />
            </div>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              label={"Create User"}
              btnStyle={"light"}
              borderRadius={"1rem"}
              icon={addIcon}
              onClick={() => setCreateUserModal(true)}
            />
          )}
        />
      </div>
      <CreateUserModal
        modal={createUserModal}
        closeModal={() => setCreateUserModal(false)}
        title="Create User"
        isStatic={true}
        fetchUsers={fetchUsers} // Pass addUser function to modal
      />
      <UpdateUserModal
        modal={updateUserModal}
        closeModal={() => setUpdateUserModal(false)}
        title={`Update User - ${selectedUser?.employee_name}`}
        isStatic={true}
        user={selectedUser}
        fetchUsers={fetchUsers} // Pass edit function to modal
      />
    </>
  );
};

export default Index;
