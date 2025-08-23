import {
  IonButton,
  IonButtons,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../../../hooks/context/AuthContext";
import useLogout from "../../../hooks/auth/use-logout";
import useCreateMedicalResult from "../../../hooks/use-create-medical-result";
import useGetMedicalResults from "../../../hooks/use-get-medical-results";
import StatusList from "../../../components/StatusList";
import SimpleAutoCompleteInput from "../../../shared-components/fields/SimpleAutoCompleteInput";
import { MedicalResult } from "../../../hooks/use-get-medical-results"; // Import interface
import Loading from "../../other/Loading";
import useGetPhysicianDoctor from "../../../hooks/use-get-physician-doctor";

const ABGForm: React.FC = () => {
  const { user } = useAuthContext();
  const { logout: handleLogout } = useLogout();
  const datetime = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<{ from: string; to: string } | null>({
    from: datetime,
    to: datetime,
  });

  const {
    data: resultsQuery,
    isLoading: resultIsLoading,
    refresh,
  } = useGetMedicalResults({
    from: date?.from,
    to: date?.to,
  });
  const [selectedPatient, setSelectedPatient] = useState<MedicalResult | null>(
    null
  );
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);

  const patientName = useMemo(() => {
    return resultsQuery
      ?.filter((item) => item.status && item.status > 0)
      .map(({ id, patient_name }) => ({ id, patient_name }));
  }, [resultsQuery]);

  const filteredResults = useMemo(() => {
    if (!selectedPatient?.patient_name) return resultsQuery;
    return resultsQuery?.filter(
      (e) => e.patient_name === selectedPatient.patient_name
    );
  }, [resultsQuery, selectedPatient]);

  const handlePreviewForm = useCallback((id: string) => {
    setSelectedResultId(id);
  }, []);

  useIonViewWillEnter(() => {
    refresh(); // ⬅️ Automatically refetches data when page is navigated to
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ABG Form</IonTitle>
          <IonButtons slot="end">
            <IonButton
              color={"danger"}
              className="ion-text-capitalize"
              onClick={handleLogout}>
              <IonText>Logout</IonText>
              <IonIcon icon={logOutOutline} slot="start" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={false} className="ion-margin-horizontal">
        <IonRefresher
          slot="fixed"
          onIonRefresh={async (event) => {
            await refresh();
            event.detail.complete(); // ✅ this is crucial to stop the spinner
          }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div
          className="p-3 shadow-sm"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "white",
            padding: "0.5rem",
          }}>
          <IonCardTitle className="ion-padding-bottom">
            Search Patient
          </IonCardTitle>
          <div className="ion-margin-bottom">
            <SimpleAutoCompleteInput
              data={patientName}
              label="Patient"
              value={selectedPatient}
              onChange={(event, newValue) =>
                setSelectedPatient(newValue as MedicalResult)
              }
              getOptionLabel={(option: any) => option?.patient_name ?? ""}
            />
          </div>
          <IonInput
            type="date"
            value={date?.from}
            onIonChange={(e) => {
              setDate((prev) => ({
                ...prev!,
                from: e.detail.value as string,
              }));
            }}
            label="Date From"
            labelPlacement="floating"
            fill="outline"
            className="ion-margin-bottom"
          />
          <IonInput
            type="date"
            value={date?.to}
            onIonChange={(e) => {
              setDate((prev) => ({
                ...prev!,
                to: e.detail.value as string,
              }));
            }}
            label="Date To"
            labelPlacement="floating"
            fill="outline"
          />
        </div>
        {resultIsLoading ? (
          <div
            style={{
              height: "100vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
            }}>
            <IonSpinner />
          </div>
        ) : (
          filteredResults.length > 0 && (
            <div className="p-3 ion-padding">
              <StatusList
                onhandlePreview={handlePreviewForm}
                label="patient_name"
                status="status"
                date="date_text"
                longText="diagnosis"
                items={filteredResults}
              />
            </div>
          )
        )}
      </IonContent>
    </IonPage>
  );
};

export default ABGForm;
