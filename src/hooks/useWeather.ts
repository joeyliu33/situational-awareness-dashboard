import { useState, useEffect } from 'react';
import { type WeatherData } from '../api/types';
import getWeather from '../api/getWeather';

export const useWeather = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const result = await getWeather();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to load weather')
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadWeather();
  }, []);

  return { data, isLoading, error };
};
