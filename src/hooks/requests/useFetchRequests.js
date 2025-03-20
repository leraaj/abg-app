import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/useAuthContext";

const useFetchRequests = () => {
  const { API_URL } = useAuthContext();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRequests = async () => {
    // console.log(`Inputs:\n`, data);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/medical-test-request/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        setError(response);
        return console.error(`Response Error:\n`, response);
      } else {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error(`Try/Catch Error:\n`, error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  return { requests, isLoading, fetchRequests, error };
};

export default useFetchRequests;
