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

const Index = () => {
  const { users, isLoading: userLoading } = useFetchUsers();
  const {
    handleDeleteUser,
    error: deleteUserError,
    message: deleteUserMessage,
  } = useDeleteUser();
  const { positions, isLoading: positionsLoading } = useFetchPositions();

  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUsers, setEditedUsers] = useState({}); // Store edited users
  const [createdUsers, setCreatedUsers] = useState([]); // Store new users before fetching updates

  // Function to edit a user by ID
  const updateUser = (id, updatedData) => {
    setEditedUsers((prev) => {
      const newUserData = { ...prev[id], ...updatedData };

      // Ensure position_type updates dynamically
      const newPosition = positions.find(
        (pos) => pos.id === newUserData.position_id
      );
      newUserData.position_type = newPosition
        ? newPosition.type
        : prev[id]?.position_type;

      return { ...prev, [id]: newUserData };
    });
  };

  // Function to add a new user (used in CreateUserModal)
  const addUser = (newUser) => {
    setCreatedUsers((prev) => [...prev, newUser]);
  };
  const deleteUser = (id) => {
    setCreatedUsers((prev) => prev.filter((user) => user.id !== id));
    setEditedUsers((prev) => {
      const newEditedUsers = { ...prev };
      delete newEditedUsers[id];
      return newEditedUsers;
    });
  };

  // Memoized data with applied edits & created users
  const data = useMemo(() => {
    if (!users) return [];

    // Combine fetched users and locally created users
    const allUsers = [...users, ...createdUsers];

    return allUsers.map((user) => {
      const position = positions.find((pos) => pos?.id === user?.position_id);
      const editedUser = editedUsers[user.id] || {};

      return {
        id: user?.id,
        employee_name: editedUser.employee_name ?? user?.employee_name,
        employee_number: editedUser.employee_number ?? user?.employee_number,
        username: editedUser.username ?? user?.username,
        password: editedUser.password ?? user?.password,
        position_id: editedUser.position_id ?? user?.position_id,
        position_type: editedUser.position_type ?? position?.type, // Ensure correct type mapping
      };
    });
  }, [users, createdUsers, editedUsers, positions]); // Include `createdUsers`

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
    await handleDeleteUser(user.id); // Await the deletion before continuing

    if (!deleteUserError) {
      // Check if there was no error
      deleteUser(user.id); // Proceed to delete the user
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
            <div className={"d-flex gap-1"}>
              <Button
                label={"Update"}
                btnStyle={"light"}
                borderRadius={"1rem"}
                onClick={() => {
                  setSelectedUser(row.original);
                  setUpdateUserModal(true);
                }}
              />
              <Button
                label={"Remove"}
                btnStyle={"light"}
                borderRadius={"1rem"}
                onClick={() => {
                  // setSelectedUser(row.original);
                  // setDeleteUserModal(true);
                  handleDelete(row.original);
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
        addUser={addUser} // Pass addUser function to modal
      />
      <UpdateUserModal
        modal={updateUserModal}
        closeModal={() => setUpdateUserModal(false)}
        title={`Update User - ${selectedUser?.employee_name}`}
        isStatic={true}
        user={selectedUser}
        updateUser={updateUser} // Pass edit function to modal
      />
      {/* <DeleteUserModal
        modal={deleteUserModal}
        closeModal={() => setDeleteUserModal(false)}
        title={`Delete User - ${selectedUser?.employee_name}`}
        isStatic={false}
        user={selectedUser}
      /> */}
    </>
  );
};

export default Index;
