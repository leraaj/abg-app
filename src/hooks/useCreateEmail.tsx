import { useState } from "react";
import { useHistory } from "react-router";
import { useToast } from "../utils/ToastContext";

interface EmailPayload {
  patientName: string;
  [key: string]: any;
}

interface EmailResponse {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

const useCreateEmail = () => {
  const showToast = useToast();
  const [data, setData] = useState<EmailResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const sendEmail = async (payload: EmailPayload): Promise<void> => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("patientName", payload.patientName);

      // You can add more fields if needed
      // formData.append("physician", payload.physician);
      // formData.append("diagnosis", payload.diagnosis);

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz5TnR6kLY6hirCoWZLtS6GJZ6-pEBhY0ijwJeCJrkr3LDFF88KmHu2VNnZiChHPYSs/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      const result: EmailResponse = await response.json();
      console.log("Email API response:", result);

      showToast("Email successfully sent", "success");
      setData(result);
      history.push("/tabs");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      showToast("Email failed to send", "danger");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, data, isLoading, error };
};

export default useCreateEmail;
