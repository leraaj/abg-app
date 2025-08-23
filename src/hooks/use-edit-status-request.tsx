import { useState } from "react";
import { useToast } from "../utils/ToastContext";
// Define the shape of your API response for a request (customize if needed)
export interface MedicalTestRequest {
  id: string;
  patient_name: string;
  testName: string;
  status: string | number;
  date: string;
  // add more fields if your API returns them
}

// Define the shape of the data you send when updating status
export interface UpdateStatusRequestData {
  status: string | number;
  [key: string]: any; // allow extra fields if needed
}

const useEditStatusRequest = () => {
  const server = import.meta.env.VITE_APP_API as string;
  const showToast = useToast();
  const [data, setData] = useState<MedicalTestRequest | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const editStatusRequest = async (
    requestId: string | number,
    updateData: UpdateStatusRequestData
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${server}/api/medical-test-request/update-status/${requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update medical test request");
      }

      const result: MedicalTestRequest = await response.json();
      setData(result);
      showToast("Record successfully updated", "success");
    } catch (err: any) {
      setError(err.message);
      showToast("Record failed to update", "warning");
    } finally {
      setIsLoading(false);
    }
  };

  return { editStatusRequest, data, isLoading, error };
};

export default useEditStatusRequest;
