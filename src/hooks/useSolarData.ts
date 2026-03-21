import { useState, useEffect, useCallback } from "react";

export interface SolarData {
  output: string;
  isLoading: boolean;
  isError: boolean;
}

export function useSolarData() {
  const [data, setData] = useState<SolarData>({
    output: "",
    isLoading: true,
    isError: false,
  });

  const fetchData = useCallback(async () => {
    setData((prev) => ({ ...prev, isLoading: true, isError: false }));
    try {
      const res = await fetch("https://solar-backend-xv6j.onrender.com/predict");
      if (!res.ok) throw new Error("Server error");
      const json = await res.json();
      setData({ output: json.output, isLoading: false, isError: false });
    } catch {
      setData({ output: "", isLoading: false, isError: true });
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { ...data, refresh: fetchData };
}
