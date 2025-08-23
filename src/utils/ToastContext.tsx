import React, { createContext, useContext, useState } from "react";
import { IonToast } from "@ionic/react";

// 👇 Define function signature with message and optional color
type ShowToast = (msg: string, color?: string) => void;

const ToastContext = createContext<ShowToast>(() => {});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastColor, setToastColor] = useState<string>("primary");

  const show: ShowToast = (msg, color = "primary") => {
    setToastMessage(msg);
    setToastColor(color);
    setShowToast(true);
  };

  return (
    <ToastContext.Provider value={show}>
      {children}
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={2500}
        position="bottom"
        color={toastColor}
        onDidDismiss={() => setShowToast(false)}
      />
    </ToastContext.Provider>
  );
};
