import { useEffect, useState } from "react";
import axios from "axios";

type MedicalRequest = {
  // Adjust this type based on your actual API response structure
  id: string;
  patient_name: string;
  testType: string;
  dateRequested: string;
  status: number;
};

const useGetMedicalRequest = () => {
  const server = import.meta.env.VITE_APP_API;
  const [data, setData] = useState<MedicalRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MedicalRequest[]>(
          `${server}/api/medical-test-request`,
          {
            withCredentials: true, // ✅ this tells Axios to send/receive cookies
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
      } catch (error: any) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [server]);

  return { data, isLoading, error };
};

export default useGetMedicalRequest;
