import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
  const { API_URL, dispatch, currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Logout failed");
        setIsLoading(false);
        return console.error("Logout Error:", data);
      }
      setTimeout(async () => {
        dispatch({ type: "LOGOUT" });
        await currentUser(); //after dispatch, refreshing the states para bumalik sa default
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error during logout:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { handleLogout, isLoading, error };
};

export default useLogout;
