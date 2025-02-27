import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useFetchPositions = () => {
  const { API_URL } = useAuthContext();
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPositions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/positions`, {
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
        setPositions(data);
      }
    } catch (error) {
      console.error(`Try/Catch Error:\n`, error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPositions();
  }, []);

  return { positions, isLoading, error };
};

export default useFetchPositions;
