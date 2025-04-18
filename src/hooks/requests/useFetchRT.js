import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/useAuthContext";

const useFetchRT = () => {
  const { API_URL } = useAuthContext();
  const [rt, setRt] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAssignee = async () => {
    // console.log(`Inputs:\n`, data);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users/assignee-for-rt`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        setError(response);
        return console.error(`Response Error:\n`, response);
      } else {
        const data = await response.json();
        setRt(data);
      }
    } catch (error) {
      console.error(`Try/Catch Error:\n`, error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAssignee();
  }, []);

  return { rt, isLoading, error, fetchAssignee };
};

export default useFetchRT;
