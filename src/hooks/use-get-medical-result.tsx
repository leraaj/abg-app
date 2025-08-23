import { useEffect, useState } from "react";

interface MedicalResult {
  // Define the structure based on expected API response
  // Example:
  id: number;
  patient_name: string;
  diagnosis: string;
  date_text: string;
  [key: string]: any; // fallback for any other fields
}

const useGetMedicalResult = (resultId?: string | number | null) => {
  const server = import.meta.env.VITE_APP_API;
  const [data, setData] = useState<MedicalResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resultId) return;

    const fetchRequest = async () => {
      try {
        const response = await fetch(
          `${server}/api/medical-test-results/view-medical-report-form/${resultId}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch medical result");
        }
        const result: MedicalResult = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequest();
  }, [resultId, server]);

  return { data, isLoading, error };
};

export default useGetMedicalResult;
