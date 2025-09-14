import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../utils/ToastContext";

type MedicalResult = {
  // Adjust this type according to your actual API response structure
  id: string;
  // add other fields as needed
};

type RequestBody = Record<string, any> | Record<string, any>[] | null;

const useCreateMedicalResult = (requestBody: RequestBody) => {
  const showToast = useToast();
  const server = import.meta.env.VITE_APP_API;
  const [data, setData] = useState<MedicalResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //   const navigate = useNavigate();
  console.log(`DATA: ${data}`);
  useEffect(() => {
    const createResult = async () => {
      try {
        setIsLoading(true);
        const payload = Array.isArray(requestBody)
          ? Object.assign({}, ...requestBody)
          : requestBody;

        const response = await axios.post<MedicalResult>(
          `${server}/api/medical-test-results`,
          payload,
          {
            withCredentials: true, // ✅ this tells Axios to send/receive cookies
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response) {
          throw new Error("Failed to create Medical Result");
        }
        console.log(response);
        showToast("Record Successfully created", "success");
        setData(response.data);
        // navigate("../scanned-result");
      } catch (error: any) {
        setError(error?.message ?? "Unknown error occurred");
        showToast("Record Failed to create", "danger");
      } finally {
        setIsLoading(false);
      }
    };

    if (
      requestBody &&
      (typeof requestBody === "object" || Array.isArray(requestBody))
    ) {
      createResult();
    }
  }, [
    requestBody,
    // navigate,
    server,
  ]);

  return { data, isLoading, error };
};

export default useCreateMedicalResult;
