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
import { calendarOutline } from "ionicons/icons";
import { logOutOutline } from "ionicons/icons";
import React, { useCallback, useMemo, useState } from "react";
import { useAuthContext } from "../../../hooks/context/AuthContext";
import useLogout from "../../../hooks/auth/use-logout";
import useGetMedicalResults from "../../../hooks/use-get-medical-results";
import StatusList from "../../../components/StatusList";
import SimpleAutoCompleteInput from "../../../shared-components/fields/SimpleAutoCompleteInput";
import { MedicalResult } from "../../../hooks/use-get-medical-results";
import moment from "moment";
import ScreenHeader from "../../../components/ScreenHeader";

const ABGForm: React.FC = () => {
  const now = moment().utcOffset(8).format("YYYY-MM-DDTHH:mm");
  const { user } = useAuthContext();
  const { logout: handleLogout } = useLogout();
  const datetime = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<{ from: string; to: string } | null>({
    from: now,
    to: now,
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
      <ScreenHeader />
      <IonContent className="ion-margin-horizontal">
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
          <div className="ion-margin-bottom">
            <IonInput
              type="datetime-local"
              value={date?.from}
              onIonChange={(e) => {
                setDate((prev) => ({
                  ...prev!,
                  from: e.detail.value as string,
                }));
              }}
              label="Date From"
              labelPlacement="floating"
              fill="outline">
              <IonIcon slot={"start"} icon={calendarOutline} />
            </IonInput>
          </div>
          <div>
            <IonInput
              type="datetime-local"
              value={date?.to}
              onIonChange={(e) => {
                setDate((prev) => ({
                  ...prev!,
                  to: e.detail.value as string,
                }));
              }}
              label="Date To"
              labelPlacement="floating"
              fill="outline">
              <IonIcon slot={"start"} icon={calendarOutline} />
            </IonInput>
          </div>
        </div>
        {resultIsLoading ? (
          <div
            style={{
              height: "calc(100dvh - var(--ion-safe-area-top))",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingTop: "var(--ion-safe-area-top)",
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
