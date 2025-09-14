import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import React from "react";
import { useAuthContext } from "../hooks/context/AuthContext";
import useLogout from "../hooks/auth/use-logout";

const ScreenHeader: React.FC = () => {
  const { user } = useAuthContext();

  const { logout: handleLogout } = useLogout();
  return (
    <IonHeader mode="md">
      <IonToolbar>
        <IonTitle>ABG Form</IonTitle>
        <IonButtons slot="end">
          <IonText>{user?.employee_name}</IonText>
          <IonButton
            color={"danger"}
            fill="clear"
            className="ion-text-capitalize"
            onClick={handleLogout}>
            <IonText>Logout</IonText>
            <IonIcon icon={logOutOutline} slot="start" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default ScreenHeader;
