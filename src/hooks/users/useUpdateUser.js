import React, { useState } from "react";
import { useAuthContext } from "../auth/useAuthContext";

const useUpdateUser = () => {
  const { API_URL } = useAuthContext();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUserUpdate = async (id, data) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data);
        return console.error("Response Error", data);
      } else {
        const data = await response.json();
        setMessage(data);
      }
    } catch (error) {
      setError("Catch Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return { handleUserUpdate, message, error, isLoading };
};

export default useUpdateUser;
