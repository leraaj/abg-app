import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { caretBack, handLeftOutline } from "ionicons/icons";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import useGetMedicalResults from "../../../hooks/use-get-medical-results";
import { MedicalResult } from "../../../hooks/use-get-medical-results"; // Import interface
import useGetMedicalResult from "../../../hooks/use-get-medical-result";
import ResultForm from "../../../components/ResultForm";
import useEditStatusRequest from "../../../hooks/use-edit-status-request";
import useEditMedicalResult from "../../../hooks/use-edit-medical-result";
import useGetPhysicianDoctor from "../../../hooks/use-get-physician-doctor";
import { TextField } from "@mui/material";
import SimpleAutoCompleteInput from "../../../shared-components/fields/SimpleAutoCompleteInput";
import useCreateEmail from "../../../hooks/useCreateEmail";
import { useAuthContext } from "../../../hooks/context/AuthContext";
interface OptionType {
  id: number;
  label: string;
  value: string;
}

type Item =
  | {
      name: string;
      label: string;
      type: "autocomplete";
      options: OptionType[];
      loading?: boolean;
    }
  | {
      name: string;
      label: string;
      type: "text" | "number";
    };

const ABGView: React.FC = () => {
  const { user } = useAuthContext();
  const { id } = useParams<{ id: string }>();
  const { data: userPhysicianQuery, isLoading: isPhysicianDoctorLoading } =
    useGetPhysicianDoctor();
  const { data, isLoading, error } = useGetMedicalResult();
  const { editStatusRequest } = useEditStatusRequest();
  const { editMedicalResult, isLoading: isEditResultLoading } =
    useEditMedicalResult();
  const { sendEmail, isLoading: isSendEmailLoading } = useCreateEmail();
  const history = useHistory();
  // Convert id to number and filter
  const selectedEmployee = useMemo(() => {
    if (!data || !id) return null;
    return data.find((item: any) => String(item.id) === id) ?? null;
  }, [data, id]);
  const { data: specificResultQuery, isLoading: specificResulIsLoading } =
    useGetMedicalResult(id);

  useEffect(() => {
    if (specificResultQuery) {
      setFields(JSON.parse(specificResultQuery?.extracted_text));
    }
  }, [specificResultQuery]);
  type ParsedFields = Record<string, string>;
  const [fields, setFields] = useState<ParsedFields | null>(null);

  const handleComplete = () => {
    editStatusRequest(specificResultQuery?.request_id, { status: 3 });
    setTimeout(() => {
      history.push("/tabs");
      // setSelectedResultId(null);
    }, 2000);
  };
  // still just handles formData
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdateInterpretation(formData); // <-- just use your state
  };

  const handleUpdateInterpretation = (payload: any) => {
    editMedicalResult(id, payload);
    setTimeout(() => {
      history.push("/tabs");
      // setSelectedResultId(null);
    }, 2000);
    console.log("Submitting payload:", payload);
  };

  // ==================
  const [formData, setFormData] = useState<Record<string, string>>({
    interpreted_by: "",
    interpreted_message: "",
  });
  const physicianOptions =
    userPhysicianQuery?.map(({ id, employee_name }) => ({
      id,
      label: employee_name,
      value: employee_name, // this is what will be stored in formData
    })) || [];

  const items: Item[] = [
    {
      name: "interpreted_by",
      label: "Interpreted by",
      type: "autocomplete",
      options: physicianOptions, // must always be an array
      loading: false, // optional
    },
    {
      name: "interpreted_message",
      label: "Interpreted message",
      type: "text",
    },
  ];

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };
  console.log(specificResultQuery);
  const handleSendEmail = () => {
    sendEmail({ id }); // wrap id in an object
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={"/tabs/abg"}
              text="back"
              icon={caretBack}></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form className="ion-margin-0 ion-padding-0" onSubmit={handleSubmit}>
          <IonGrid className="ion-padding-top ion-padding-horizontal">
            <IonRow>
              <IonCol size="12">
                <IonText className="ion-text-bold">
                  <strong>
                    Update patient {specificResultQuery?.patient_name}'s result
                    interpretation
                  </strong>
                </IonText>
              </IonCol>
              <IonCol size="12">
                {items.map((item) => (
                  <div key={item.name}>
                    {item.type === "text" || item.type === "number" ? (
                      <TextField
                        size="small"
                        fullWidth
                        label={item.label}
                        type={item.type}
                        value={formData[item?.name] || ""}
                        onChange={(e) =>
                          handleChange(item.name, e.target.value)
                        }
                        required
                      />
                    ) : item.type === "autocomplete" ? (
                      <>
                        <div className="ion-padding-bottom">
                          <SimpleAutoCompleteInput
                            data={item.options || []} // <-- fallback
                            label={item.label}
                            value={
                              (item.options || []).find(
                                (option) => option.value === formData[item.name]
                              ) || null
                            }
                            onChange={(event, newValue) =>
                              handleChange(item.name, newValue?.value || "")
                            }
                            getOptionLabel={(option) => option?.label || ""}
                            loading={item?.loading || false}
                            required
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                ))}
              </IonCol>

              <IonCol>
                {specificResultQuery && (
                  <>
                    {specificResultQuery?.status === 2 && (
                      <IonButton
                        type="button"
                        className="ion-text-capitalize"
                        color={"success"}
                        disabled={specificResulIsLoading}
                        onClick={handleComplete}>
                        Mark as complete
                      </IonButton>
                    )}

                    {user?.position_id !== undefined &&
                      [4, 5].includes(user.position_id) && (
                        <IonButton
                          type="submit"
                          className="ion-text-capitalize"
                          color="success">
                          Update Interpretation
                        </IonButton>
                      )}

                    {specificResultQuery?.status === 3 && (
                      <IonButton
                        type="button"
                        className="ion-text-capitalize"
                        color={"success"}
                        onClick={handleSendEmail}>
                        Email to Department
                      </IonButton>
                    )}
                  </>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
        <div className="border p-3 mb-3 d-flex align-items-center gap-3">
          {specificResulIsLoading ? (
            <div
              style={{
                height: "100dvh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
              }}>
              <IonSpinner />
            </div>
          ) : (
            <div style={{ overflow: "auto", width: "100%" }}>
              <ResultForm
                defaultValues={{
                  prepared_by: specificResultQuery?.respiratory_therapists,
                  name: specificResultQuery?.patient_name || "",
                  ageGender:
                    specificResultQuery?.age && specificResultQuery?.sex
                      ? `${specificResultQuery.age} / ${specificResultQuery.sex}`
                      : "",
                  ward: specificResultQuery?.ward || "",
                  diagnosis: specificResultQuery?.diagnosis,
                  physician: specificResultQuery?.physician_doctor,
                  date: specificResultQuery?.date || "",
                  time: specificResultQuery?.date || "",
                  temp: "",
                  hgb: fields?.HGB,
                  fio2: fields?.FIO2,
                  pH: fields?.pH,
                  pco2: fields?.pCO2,
                  po2: fields?.PO2,
                  hco3: fields?.HCO3, // remove duplicate hco3 if present
                  be: fields?.BE,
                  sao2: fields?.SO2,
                  ctco2: fields?.TCO2,
                  interpreted_by: specificResultQuery?.interpreted_by,
                  mixed: specificResultQuery?.interpreted_message,
                }}
              />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ABGView;
