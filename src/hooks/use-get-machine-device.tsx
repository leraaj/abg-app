import { useEffect, useState } from "react";
const useGetMachineDevice = () => {
  const server = import.meta.env.VITE_APP_API;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${server}/api/machines
`);
        if (!response.ok) {
          throw new Error("Failed to fetch Machine Device");
        }
        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // ✅ type-safe
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [server]);
  return { data, isLoading, error };
};

export default useGetMachineDevice;
