import { useState, useEffect } from 'react';
import { type NetworkSummary } from '../api/types';
import getNetworkSummary from '../api/getNetworkSummary';

export const useNetworkSummary = () => {
  const [data, setData] = useState<NetworkSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadNetworkSummary = async () => {
      try {
        const result = await getNetworkSummary();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to load network summary')
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadNetworkSummary();
  }, []);

  return { data, isLoading, error };
};
