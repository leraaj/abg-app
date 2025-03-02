import React, { useState } from "react";
import { useAuthContext } from "../auth/useAuthContext";

const useCreateUser = () => {
  const { API_URL } = useAuthContext();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateUser = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/users/`, {
        method: "POST",
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
        setError(null);
      }
    } catch (error) {
      setError("Catch Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return { handleCreateUser, message, error, isLoading };
};

export default useCreateUser;
