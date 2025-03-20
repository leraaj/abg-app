import React, { useState } from "react";
import { useAuthContext } from "../auth/useAuthContext";

const useCreateRequest = () => {
  const { API_URL } = useAuthContext();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateRequest = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/medical-test-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
        // body: JSON.stringify(initialRequestData),
      });
      if (!response.ok) {
        const data = await response.json();
        alert(data);
        setError(data);
        return console.error("Response Error", data);
      } else {
        const data = await response.json();
        setMessage(data);
        setError(null);
      }
    } catch (error) {
      console.log(error);
      alert(error);
      setError("Catch Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return { handleCreateRequest, message, error, isLoading };
};

export default useCreateRequest;
