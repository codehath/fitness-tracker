import { useState, useCallback } from 'react';

export const useApi = <T>(apiFunc: (...args: any[]) => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (...params: any[]) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunc(...params);
        setData(result);
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An error occurred';
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  return { data, error, loading, execute };
};
