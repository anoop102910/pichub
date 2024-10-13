import { useState, useEffect } from "react";
import api from "@/util/api";
export default function useFetch(url, options) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(url, options);
                setData(response.data.data);
            }
            catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [url, options]);
    return [data, isLoading, error];
}
