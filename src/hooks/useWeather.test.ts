import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useWeather } from './useWeather';
import getWeather from '../api/getWeather';
import { type WeatherData } from '../api/types';

// Mock the API module
vi.mock('../api/getWeather');

const mockedGetWeather = vi.mocked(getWeather);

const mockWeatherData: WeatherData = {
  city: 'Melbourne',
  temperature: 32,
  unit: 'C',
  condition: 'partly-cloudy',
  datetime: '2024-01-16T15:46:00+11:00',
  humidity: 78,
  chanceOfRain: 34,
  windSpeed: 21,
  windUnit: 'kmh',
  tomorrow: {
    temperature: 30,
    condition: 'sunny',
  },
};

describe('useWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize in loading state', () => {
    // Return a pending promise
    mockedGetWeather.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useWeather());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it('should successfully fetch weather data', async () => {
    mockedGetWeather.mockResolvedValue(mockWeatherData);

    const { result } = renderHook(() => useWeather());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockWeatherData);
  });

  it('should handle API errors by creating a fallback Error object', async () => {
    const apiError = new Error('Connection Lost');
    mockedGetWeather.mockRejectedValue(apiError);

    const { result } = renderHook(() => useWeather());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Connection Lost');
  });

  it('should handle non-Error objects thrown by the API', async () => {
    mockedGetWeather.mockRejectedValue('Something went wrong');

    const { result } = renderHook(() => useWeather());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Validates that your catch block wraps strings in an Error object
    expect(result.current.error?.message).toBe('Failed to load weather');
  });

  it('should be idempotent (only call API once on mount)', async () => {
    mockedGetWeather.mockResolvedValue(mockWeatherData);

    const { rerender } = renderHook(() => useWeather());

    rerender();
    rerender();

    expect(mockedGetWeather).toHaveBeenCalledTimes(1);
  });
});
