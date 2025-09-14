import { useState } from "react";
import { useHistory } from "react-router";
import { useToast } from "../utils/ToastContext";

interface EmailPayload {
  id: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  [key: string]: unknown; // extendable depending on API
}

const useCreateEmail = () => {
  const server = import.meta.env.VITE_APP_API as string;
  const showToast = useToast();
  const [data, setData] = useState<EmailResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const sendEmail = async (payload: EmailPayload): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await fetch(`${server}/api/emails/send-abg-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to send Email");
      }

      const result: EmailResponse = await response.json();
      showToast("Email successfully sent", "success");
      setData(result);
      history.push("/tabs");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      showToast("Email failed to send", "danger");
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, data, isLoading, error };
};

export default useCreateEmail;
