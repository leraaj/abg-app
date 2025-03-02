import React, { useState } from "react";
import { useAuthContext } from "../auth/useAuthContext";

const useDeleteUser = () => {
  const { API_URL } = useAuthContext();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteUser = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        // If not successful, try to parse the error message from the server.
        const errorData = await response.text(); // Use text() for cases without JSON
        setError(errorData);
        return console.error("Response Error", errorData);
      }

      // If response is OK, check for content before parsing JSON
      if (response.status !== 204) {
        // 204 No Content response doesn't need .json()
        const data = await response.json();
        setMessage(data);
        setError(null);
      } else {
        // Handle the case where there is no content (204 status)
        setMessage({ success: true, message: "User deleted successfully" });
        setError(null);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDeleteUser, message, error, isLoading };
};

export default useDeleteUser;
