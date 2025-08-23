import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastProvider } from "./utils/ToastContext";
import { AuthContextProvider } from "./hooks/context/AuthContext";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ToastProvider>
  </React.StrictMode>
);
