import { useState } from "react";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";

import { useAuthContext } from "../context/AuthContext";
import { useToast } from "../../utils/ToastContext";
import { useHistory } from "react-router";
import Loading from "../../pages/other/Loading";
import SignInLoading from "../../pages/other/SignInLoading";

const useLogin = () => {
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useAuthContext();
  const history = useHistory();
  const login = async (username: string | null, password: string | null) => {
    if (!username?.trim() || !password?.trim()) {
      await showToast("All fields are required", "warning");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/users/login`,
        { username, password, isMobile: true },
        {
          withCredentials: true, // ✅ this tells Axios to send/receive cookies
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response) {
        setError("Invalid credentials");
        return showToast("Invalid credentials", "danger");
      }
      const userData = response.data.data;
      setUser(userData);
      await Preferences.set({
        key: "user",
        value: JSON.stringify(userData),
      });

      history.push("/tabs/abg");
      showToast(response.data.message, "success");
    } catch (err: any) {
      // showToast(err.message, "danger");
      // setError(err.message);
      if (err.status == 400) {
        setError(err.response.data.message);
        return showToast(err.response.data.message, "danger");
      } else {
        showToast(err.message, "danger");
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
