import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../utils/ToastContext";

type MedicalRequestBody = Record<string, any> | Record<string, any>[]; // Adjust based on your form structure
type MedicalRequestResponse = Record<string, any>; // Adjust based on expected API response

const useCreateMedicalRequest = (requestBody: MedicalRequestBody) => {
  const showToast = useToast();
  const server = import.meta.env.VITE_APP_API;
  const [data, setData] = useState<MedicalRequestResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //   const navigate = useNavigate();

  useEffect(() => {
    const createRequest = async () => {
      try {
        setIsLoading(true);

        // Flatten array of objects into a single object, if needed
        const payload = Array.isArray(requestBody)
          ? Object.assign({}, ...requestBody)
          : requestBody;

        const response = await axios.post<MedicalRequestResponse>(
          `${server}/api/medical-test-request`,
          payload,
          {
            withCredentials: true, // ✅ this tells Axios to send/receive cookies
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        showToast("Record Successfully created", "success");
        setData(response.data);
        // navigate("../request");
      } catch (error: any) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "An unknown error occurred"
        );
        showToast("Record Failed to create", "warning");
      } finally {
        setIsLoading(false);
      }
    };

    if (
      requestBody &&
      (typeof requestBody === "object" || Array.isArray(requestBody))
    ) {
      createRequest();
    }
  }, [
    requestBody,
    server,
    // , navigate
  ]);

  return { data, isLoading, error };
};

export default useCreateMedicalRequest;
