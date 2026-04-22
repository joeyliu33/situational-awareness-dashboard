import { useState, useEffect } from 'react';
import { type DelayedRoute } from '../api/types';
import getDelayedRoutes from '../api/getDelayedRoutes';

export const useDelayedRoutes = () => {
  const [data, setData] = useState<DelayedRoute[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadDelayedRoutes = async () => {
      try {
        const result = await getDelayedRoutes();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to load delayed routes')
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadDelayedRoutes();
  }, []);

  return { data, isLoading, error };
};
