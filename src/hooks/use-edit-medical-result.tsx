import { useState } from "react";
import { useToast } from "../utils/ToastContext";
// Shape of a single medical result (customize based on your API)
export interface MedicalResult {
  id: string;
  patient_name: string;
  testName: string;
  result: string;
  date: string;
  status?: number;
}

// Shape of the update data you’ll send to the API
// Add/remove fields depending on your backend schema
export interface UpdateMedicalResultData {
  interpretation?: string;
  [key: string]: any;
}

const useEditMedicalResult = () => {
  const server = import.meta.env.VITE_APP_API as string;
  const showToast = useToast();
  const [data, setData] = useState<MedicalResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const editMedicalResult = async (
    resultId: string | number,
    updateData: UpdateMedicalResultData
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${server}/api/medical-test-results/view-medical-report-form/${resultId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update medical result");
      }

      const result: MedicalResult = await response.json();
      setData(result);
      showToast("Record successfully updated", "success");
    } catch (err: any) {
      setError(err.message);
      showToast("Record failed to update", "warning");
    } finally {
      setIsLoading(false);
    }
  };

  return { editMedicalResult, data, isLoading, error };
};

export default useEditMedicalResult;
