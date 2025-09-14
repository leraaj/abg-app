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

const Login: React.FC = () => {
  const { login, isLoading, error } = useLogin();
  const [username, setUsername] = useState<string>(""); // default empty string
  const [password, setPassword] = useState<string>(""); // default empty string

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    await login(username, password);
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
                {error && (
                  <IonText style={{ fontSize: "0.8rem" }} color="danger">
                    {error}
                  </IonText>
                )}
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
