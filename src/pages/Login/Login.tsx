import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonPage,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import useLogin from "../../hooks/auth/use-login";
import { useToast } from "../../utils/ToastContext";

const Login: React.FC = () => {
  const showToast = useToast();
  const server = import.meta.env.VITE_APP_API;
  const { login, isLoading, error } = useLogin();
  const [username, setUsername] = useState<string>(""); // default empty string
  const [password, setPassword] = useState<string>(""); // default empty string

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    await login(username, password);
  };
  const handleForgotPassword = async () => {
    const formData = new FormData();

    const generateKeyResult = await fetch(
      `${server}/api/users/generate-secret-key/${username}`
    )
      .then((res) => res.json())
      .catch(console.error);

    if (generateKeyResult?.success == true) {
      formData.append("username", username);
      fetch(
        "https://script.google.com/macros/s/AKfycbz49BTqBw4hmCZUnLF4leWj2nUGel4_R7VzXMQ-zusc7Gi02Z1bEgeJKEe8VDxocbtf/exec",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => {
          const response = JSON.stringify(res.json());
          if (res.ok) {
            showToast("Check your email for password reset", "warning");
          }
        })
        .then(console.log)
        .catch(console.error);
    } else {
      throw new Error("No user found");
    }
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        className="ion-padding-horizontal"
        style={{ height: "100%", width: "100%" }}>
        <div
          style={{
            height: "100dvh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}>
          <IonCard style={{ width: "100%" }}>
            <IonCardHeader>
              <IonCardTitle>Sign in to your Account</IonCardTitle>
            </IonCardHeader>
            <form onSubmit={handleSubmit}>
              <IonCardContent className="ion-padding-top">
                <IonInput
                  value={username}
                  labelPlacement="floating"
                  label="Username"
                  onIonInput={(e) => setUsername(e.detail.value || "")}
                />
                <IonInput
                  type="password"
                  value={password}
                  labelPlacement="floating"
                  label="Password"
                  onIonInput={(e) => setPassword(e.detail.value || "")}
                />
                {/* {error && (
                  <IonText style={{ fontSize: "0.8rem" }} color="danger">
                    {error}
                  </IonText>
                )} */}
              </IonCardContent>
              <IonButton
                expand="block"
                className="ion-margin ion-text-capitalize"
                type="submit"
                color={"success"}
                disabled={isLoading}>
                {isLoading ? "Processing..." : "Submit"}
              </IonButton>
            </form>
          </IonCard>
          {error && (
            <IonText
              className="ion-margin ion-text-capitalize text-uppercase float-end"
              onClick={handleForgotPassword}>
              Forgot password?
            </IonText>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
