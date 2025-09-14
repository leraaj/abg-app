import { useEffect, useState } from "react";

interface PhysicianDoctor {
  id: number; // or string if your app expects string
  employee_name: string;
  employee_number: number;
}

const useGetPhysicianDoctor = () => {
  const server = import.meta.env.VITE_APP_API;
  const [data, setData] = useState<PhysicianDoctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${server}/api/users/assignee-for-physician`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const result: PhysicianDoctor[] = await response.json();
        // console.log("UseGetPhysicianDoctor", result);
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [server]);

  return { data, isLoading, error };
};

export default useGetPhysicianDoctor;
