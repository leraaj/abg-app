import { Preferences } from "@capacitor/preferences";
import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define a User type (customize based on your actual user shape)
type User = {
  id: number;
  username: string;
  employee_name: string;
  employee_number: number;
  position_id: number;
  access: Array<{
    page: string;
    action?: string[];
    sub?: Array<{
      page: string;
      action: string[];
    }>;
  }>;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  hasToken: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // ✅ Add this
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const { value } = await Preferences.get({ key: "user" });
      if (!value) {
        setHasToken(false);
        setUser(null);
      } else {
        const parsedUser: User = JSON.parse(value);
        setUser(parsedUser);
        setHasToken(true);
      }
    } catch (err: unknown) {
      console.log("End");
      setHasToken(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setUser(null);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  const [sessionErrorState, setSessionErrorState] = useState(error);

  useEffect(() => {
    setSessionErrorState(error);
  }, [error]);

  useEffect(() => {
    fetchUser();
    const userString = sessionStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString); // Convert it back to an object
      console.log("Session user:", user);
    } else {
      console.log("No session user found");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, hasToken, error, fetchUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
