import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
  const { API_URL, dispatch, currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (data) => {
    // console.log(`Inputs:\n`, data);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(response);
        setIsLoading(false);
        return console.error(`Response Error:\n`, data);
      } else {
        const data = await response.json();
        setTimeout(async () => {
          dispatch({ type: "LOGIN", payload: data?.user?.user[0] });
          await currentUser();
          setIsLoading(false);
        }, 3000);
      }
    } catch (error) {
      console.error(`Try/Catch Error:\n`, error);
      setError(error);
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
};

export default useLogin;
