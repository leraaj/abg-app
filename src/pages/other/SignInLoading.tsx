import {
  IonApp,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const SignInLoading: React.FC = () => {
  return (
    <IonApp>
      <IonContent color={"light"}>
        <div
          style={{
            height: "100dvh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <IonText>Logging in</IonText>
            <IonSpinner name="circles" />
          </div>
        </div>
      </IonContent>
    </IonApp>
  );
};

export default SignInLoading;
