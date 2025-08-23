import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useToast } from "../../utils/ToastContext";
import { Preferences } from "@capacitor/preferences";

const useLogout = () => {
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { fetchUser, setUser } = useAuthContext();

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/users/logout`,
        {},
        {
          withCredentials: true, // ✅ this tells Axios to send/receive cookies
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        await Preferences.remove({ key: "user" }); // Remove from local storage
        setUser(null);
        fetchUser();
        showToast("Logged out successfully", "success");
      }
    } catch (err: any) {
      const message = err.response?.data?.message ?? "Logout failed";
      showToast(message, "danger");
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};

export default useLogout;
