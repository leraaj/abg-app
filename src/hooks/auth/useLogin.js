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
        return console.error(`Response Error:\n`, data);
      } else {
        const data = await response.json();
        dispatch({ type: "LOGIN", payload: data?.user?.user[0] });
        //after dispatch, refreshing the states para live makuha
        //ang user creds at maaccess agad
        await currentUser();
        console.log(data);
      }
    } catch (error) {
      console.error(`Try/Catch Error:\n`, error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
};

export default useLogin;
