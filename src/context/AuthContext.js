import React, { createContext, useEffect, useReducer, useState } from "react";
import useToggle from "../hooks/useToggle";
import useFetchUserPosition from "../hooks/useFetchUserPosition";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  // Sa authReducer pwede ka mag stage ng changes sa user via accessing
  // action.type and action.payload (kung ano ilalagay mo) in this case user data
  switch (action.type) {
    // sample code: dispatch({ type: "LOGIN", payload: data?.user });
    case "LOGIN":
      return { user: action.payload };
    // sample code: dispatch({ type: "LOGIN", payload: data?.user });
    case "LOGOUT":
      localStorage.clear();
      return { user: undefined };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const API_URL = `http://localhost:3001`;
  const [state, dispatch] = useReducer(authReducer, { user: undefined });
  const [toggle, setToggle] = useState(false);
  const toggler = () => {
    setToggle(!toggle);
  };
  // state = default value niya is yung { user: undefined }
  // kapag gusto mo mag-edit ng state gagamitin mo ngayon yung authReducer na function
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentUser = async () => {
    //Updates authentication state if the user is authenticated
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users/check-logged-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        await dispatch({ type: "LOGIN", payload: data?.user?.user[0] }); //Function for user (LOGIN, LOGOUT).
      } else {
        setError(data?.message);
        await dispatch({ type: "LOGOUT" }); //Function for user (LOGIN, LOGOUT).
      }
    } catch (error) {
      setError(error.message);
      console.error("Error refreshing user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Need tawagin every login or logout ang currentUser
  // para mafetch/update ang user credentials
  useEffect(() => {
    currentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, toggle, toggler, currentUser, API_URL }}>
      {/* dispatch = para sa redux functions kung mag LOGIN or LOGOUT */}
      {/* currentUser = tawagin every login or logout or update ng current user */}
      {children}
    </AuthContext.Provider>
  );
};
