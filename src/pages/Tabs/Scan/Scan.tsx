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
  IonRadioGroup,
  IonRadio,
  IonList,
} from "@ionic/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import {
  cameraOutline,
  imageOutline,
  refreshOutline,
  scanOutline,
} from "ionicons/icons";
import { useAuthContext } from "../../../hooks/context/AuthContext";
import useGetMedicalRequest from "../../../hooks/use-get-medical-requests";
import useOCR from "../../../hooks/use-ocr";
import useCreateMedicalResult from "../../../hooks/use-create-medical-result";
import CreateScannedRecordField from "../ABG/components/CreateScannedRecordField";
import imagePlaceholder from "../../../assets/images/placeholders/image.jpg";
import useGetMachineDevice from "../../../hooks/use-get-machine-device";

import moment from "moment";
import ScreenHeader from "../../../components/ScreenHeader";

interface MachineDevice {
  id: string;
  name: string;
  type: string;
  // add other fields returned by your API
}

const Scan: React.FC = () => {
  const now = moment().utcOffset(8).format("YYYY-MM-DDTHH:mm");
  const contentRef = useRef<HTMLIonContentElement | null>(null);
  const { user } = useAuthContext();

  const employee = user;
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
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
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
      isDetermined: Number(selectedValue),
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
    setSelectedValue(null);
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
  const handleIsDetermined = (e: CustomEvent) => {
    setSelectedValue(e.detail.value);
    console.log(e.detail.value);
  };

  return (
    <IonPage>
      <ScreenHeader />
      <IonContent className="ion-padding" ref={contentRef}>
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
              expand="full"
              className="ion-text-capitalize"
              color="success"
              onClick={takePhoto}>
              Take Photo
              <IonIcon slot="start" icon={cameraOutline} aria-hidden="true" />
            </IonButton>
            <IonButton
              expand="full"
              className="ion-text-capitalize"
              color="success"
              onClick={choosePhoto}>
              Choose from Gallery
              <IonIcon slot="start" icon={imageOutline} aria-hidden="true" />
            </IonButton>
            <IonButton
              expand="full"
              className="ion-text-capitalize"
              color="success"
              disabled={!image || isProcessing}
              onClick={() => image && handleOCR(image)}>
              {isProcessing ? "Processing..." : "Scan Result"}

              <IonIcon
                slot="start"
                icon={isProcessing ? refreshOutline : scanOutline}
                aria-hidden="true"
              />
            </IonButton>
            <IonButton
              expand="block"
              color="success"
              fill="outline"
              className="ion-text-capitalize"
              onClick={handleClear}
              disabled={
                !image &&
                result.length === 0 &&
                !selectedPatientId &&
                !selectedMachineId &&
                !selectedValue
              }>
              Clear
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Patient</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none" className="d-flex flex-column gap-3">
              <IonItem>
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
                  onIonChange={(e) => setSelectedMachineId(e.detail.value)}>
                  {machineName?.map((machine) => (
                    <IonSelectOption
                      key={machine.id}
                      className="ion-text-capitalize"
                      value={machine.id}>
                      {machine.machine_name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <div className="d-flex justify-content-between col-12 ">
                  <IonRadioGroup
                    className="col-12"
                    value={selectedValue || 0}
                    onIonChange={handleIsDetermined}>
                    <div className="d-flex justify-content-end gap-3">
                      <span className="col-auto">
                        <IonRadio value={1}>Determined</IonRadio>
                      </span>
                      <span className="col-auto">
                        <IonRadio value={2}>Extracted</IonRadio>
                      </span>
                    </div>
                  </IonRadioGroup>
                </div>
              </IonItem>
              <IonButton
                className="ion-text-capitalize"
                color="success"
                size="default"
                expand="full"
                disabled={
                  (!image && result.length === 0 && !selectedPatientId) ||
                  !selectedValue
                }
                onClick={handleSubmit}>
                Approve Result
              </IonButton>
            </IonList>
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
