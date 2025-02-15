import React, { createContext, useReducer } from "react";
import useToggle from "../hooks/useToggle";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      localStorage.clear();
      return { user: undefined };

    default:
      return {
        user: {
          position: 1,
          username: "john",
          password: "john",
        },
      };
  }
};

export const AuthContextProvider = ({ children }) => {
  const { toggle, toggler } = useToggle();
  const [state, dispatch] = useReducer(authReducer, { user: undefined });
  return (
    <AuthContext.Provider value={{ ...state, toggle, toggler }}>
      {children}
    </AuthContext.Provider>
  );
};
