import { useEffect, useState } from "react";

export const useResource = <T>(fetcher: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = () => {
    setLoading(true);
    fetcher()
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const mutate = (newData: T) => {
    setData(newData);
  };

  useEffect(() => {
    fetcher()
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return [
    { data, loading, error },
    { refetch, mutate },
  ];
};
