import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import logo from "../../assets/images/placeholders/image.jpg";
import React, { useState } from "react";
import { useToast } from "../../utils/ToastContext";
import axios from "axios";
import { useAuthContext } from "../../hooks/context/AuthContext";
import useLogin from "../../hooks/auth/use-login";
import { TextField } from "@mui/material";
const Login: React.FC = () => {
  const { login, isLoading, error } = useLogin();
  //   API VARIABLES
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleSubmit = async () => {
    await login(username, password);
  };

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src={logo}
                style={{
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                }}
                alt="App logo"
              />
              <IonText style={{ color: "#1976d2" }}>
                <strong>ABG</strong>
              </IonText>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader> */}
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
              <IonCardTitle>
                Sign in your Account
                {/* <br /> Origin:{window.location.origin}
                <br />
                API: {import.meta.env.VITE_APP_API} */}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="ion-padding-top">
              <IonInput
                labelPlacement="floating"
                label="Username"
                onIonInput={(e) => setUsername(e.detail.value ?? "")}
              />

              <IonInput
                type="password"
                labelPlacement="floating"
                label="Password"
                onIonInput={(e) => setPassword(e.detail.value ?? "")}
              />
              <div>
                {error && (
                  <IonText style={{ fontSize: "0.8rem" }} color={"danger"}>
                    {error}
                  </IonText>
                )}
              </div>
            </IonCardContent>
            <div>
              <IonButton
                expand="block"
                className="ion-margin ion-text-capitalize"
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}>
                {isLoading ? "Processing..." : "Submit"}
              </IonButton>
            </div>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
