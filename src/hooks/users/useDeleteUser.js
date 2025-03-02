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

      const data = await response.json();
      console.warn(data);
      if (!response.ok) {
        setError(data);
      } else {
        setError(null);
        setMessage(data);
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
