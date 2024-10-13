import { useState, useEffect } from "react";
import api from "@/util/api";

export default function useFetch<T>(url: string, options?: any): [T | null, boolean, string | null] {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(url, options);
        setData(response.data.data);
      } catch (error) {
        setError((error as Error).message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url, options]);

  return [data, isLoading, error];
}
