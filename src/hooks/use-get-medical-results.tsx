import { useCallback, useEffect, useState } from "react";

// Define the shape of a single medical result
export interface MedicalResult {
  id: string;
  patient_name: string;
  testName: string;
  result: string;
  date: string;
  status?: number;
  // Add other relevant fields from your actual API response
}

interface Props {
  from?: string | null;
  to?: string | null;
}

const useGetMedicalResults = ({ from, to }: Props) => {
  const server = import.meta.env.VITE_APP_API;
  const [data, setData] = useState<MedicalResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams();
      if (from) query.append("from", from);
      if (to) query.append("to", to);

      const response = await fetch(
        `${server}/api/medical-test-results?${query.toString()}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Medical Results");
      }

      const result: MedicalResult[] = await response.json();
      setData(result);
    } catch (error: any) {
      setError(error.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [server, from, to]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refresh: fetchData };
};

export default useGetMedicalResults;
