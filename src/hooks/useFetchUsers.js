import { useEffect, useState } from "react";
import { useAuthContext } from "./auth/useAuthContext";

const useFetchUsers = () => {
  const { API_URL } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    // console.log(`Inputs:\n`, data);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(response);
        return console.error(`Response Error:\n`, data);
      } else {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error(`Try/Catch Error:\n`, error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, error, fetchUsers };
};

export default useFetchUsers;
