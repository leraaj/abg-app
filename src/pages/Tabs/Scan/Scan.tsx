import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonImg,
  IonButtons,
  IonIcon,
  IonText,
  IonSpinner,
  IonCardHeader,
  IonCardTitle,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { logOut, logOutOutline } from "ionicons/icons";
import { useToast } from "../../../utils/ToastContext";
import axios from "axios";
import { useAuthContext } from "../../../hooks/context/AuthContext";
import useLogout from "../../../hooks/auth/use-logout";
import useGetMedicalRequest from "../../../hooks/use-get-medical-requests";
import useOCR from "../../../hooks/use-ocr";
import useCreateMedicalResult from "../../../hooks/use-create-medical-result";
import CreateScannedRecordField from "../ABG/components/CreateScannedRecordField";
import imagePlaceholder from "../../../assets/images/placeholders/image.jpg";
import useGetMachineDevice from "../../../hooks/use-get-machine-device";
import Loading from "../../other/Loading";

interface MachineDevice {
  id: string;
  name: string;
  type: string;
  // add other fields returned by your API
}

const Scan: React.FC = () => {
  const contentRef = useRef<HTMLIonContentElement | null>(null);
  const { user } = useAuthContext();

  const { logout: handleLogout } = useLogout();
  const employee = user;
  console.log(employee);

  const { data: requests, isLoading } = useGetMedicalRequest();
  const { data: machines, isLoading: isMachineLoading } = useGetMachineDevice();
  const { isProcessing, ocrResult, handleOCR } = useOCR();

  const [image, setImage] = useState<string | null>(null);
  const [scannedFields, setScannedFields] = useState<any[] | null>(null);
  const [input, setInput] = useState<any | null>(null);
  const [result, setResult] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>("");
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(
    null
  );
  const { isLoading: isGetRequestLoading } = useCreateMedicalResult(input);

  const patientOptions = useMemo(() => {
    return Array.isArray(requests)
      ? requests
          .filter((item) => item.status === 1)
          .map(({ id, patient_name }) => ({
            id,
            patient_name,
          }))
      : [];
  }, [requests]);

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 90,
    });
    setImage(photo.dataUrl ?? null);
  };

  const choosePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 90,
    });
    setImage(photo.dataUrl ?? null);
  };

  const handleSubmit = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const abgFields: Record<string, string> = {};
    scannedFields?.forEach((item) => {
      abgFields[item?.fieldName] = item?.currentValue;
    });

    // console.log("Abg-fields", abgFields);
    const patient = patientOptions?.find((p) => p.id === selectedPatientId);
    // if (!patient || !employee?.id) return;
    if (!patient) return;
    setInput({
      requestId: patient.id,
      rtId: employee?.id,
      machineId: selectedMachineId,
      extractedText: abgFields,
    });

    if (!isMachineLoading) {
      setTimeout(() => {
        handleClear();
      }, 2000);
    }
    if (!isGetRequestLoading) {
      setTimeout(() => {
        handleClear();
      }, 2000);
    }
    console.log(input);
  };

  const handleClear = () => {
    setImage(null);
    setResult([]);
    setScannedFields(null);
    setInput(null);
    setSelectedPatientId(null);
    setSelectedMachineId(null);
  };

  useEffect(() => {
    if (ocrResult) {
      setResult(ocrResult);
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [ocrResult]);
  const machineName = useMemo(() => {
    return Array.isArray(machines)
      ? machines.map(({ id, machine_name }) => ({
          id,
          machine_name,
        }))
      : [];
  }, [machines]);
  if (isLoading) return <IonSpinner />;

  function scrollToBottom() {
    contentRef.current?.scrollToBottom(500);
  }
  if (isGetRequestLoading) {
    return <IonText>Loading...</IonText>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scanned Result</IonTitle>
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
      <IonContent fullscreen={false} className="ion-padding" ref={contentRef}>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Image Preview</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div
              style={{
                maxHeight: "300px",
                width: "100%",
                overflow: image ? "auto" : "",
              }}>
              <img
                src={image ?? imagePlaceholder}
                alt="Upload"
                onClick={choosePhoto}
                style={{
                  cursor: "pointer",
                  maxHeight: image ? "100%" : "300px",
                  width: "100%",
                  objectFit: image ? "fill" : "cover",
                  overflow: image ? "auto" : "",
                }}
              />
            </div>
            <IonButton
              expand="block"
              className="ion-text-capitalize"
              color="success"
              onClick={takePhoto}>
              Take Photo
            </IonButton>
            <IonButton
              expand="block"
              className="ion-text-capitalize"
              color="success"
              onClick={choosePhoto}>
              Choose from Gallery
            </IonButton>
            <IonButton
              expand="block"
              className="ion-text-capitalize"
              color="success"
              disabled={!image || isProcessing}
              onClick={() => image && handleOCR(image)}>
              {isProcessing ? "Processing..." : "Scan Result"}
            </IonButton>
            <IonButton
              expand="block"
              color="success"
              fill="outline"
              className="ion-text-capitalize"
              onClick={handleClear}
              disabled={!image && result.length === 0 && !selectedPatientId}>
              Clear
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Patient</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem className="ion-padding-bottom">
              <IonSelect
                value={selectedPatientId}
                label="Patient name"
                labelPlacement="start"
                placeholder="Select a Patient"
                onIonChange={(e) => setSelectedPatientId(e.detail.value)}>
                {patientOptions?.map((option) => (
                  <IonSelectOption
                    key={option.id}
                    value={option.id}
                    className="ion-text-capitalize">
                    {option.patient_name} (#{option.id})
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect
                value={selectedMachineId}
                label="Machine"
                placeholder="Select a Machine"
                className="ion-text-capitalize"
                onIonChange={(e) => setSelectedMachineId(e.detail.value)}>
                {machineName?.map((machine) => (
                  <IonSelectOption key={machine.id} value={machine.id}>
                    {machine.machine_name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonButton
              className="ion-text-capitalize ion-margin-top"
              expand="block"
              color={"success"}
              disabled={!image && result.length === 0 && !selectedPatientId}
              onClick={handleSubmit}>
              Approve Result
            </IonButton>
          </IonCardContent>
        </IonCard>

        {result.length > 0 && !isGetRequestLoading && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>OCR Result</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <CreateScannedRecordField
                data={result}
                onSubmit={(fields) => setScannedFields(fields)}
              />
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Scan;
