import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import WeatherCard from './WeatherCard';
import { useWeather } from '../../hooks/useWeather';

// 1. Mock the custom hook
vi.mock('../../hooks/useWeather');

// 2. Mock the date formatter to keep strings stable
vi.mock('../../utils/dateFormatter', () => ({
  formatDate: () => 'Wednesday, 22 April',
}));

const mockedUseWeather = vi.mocked(useWeather);

describe('WeatherCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders LoadingState when isLoading is true', () => {
    mockedUseWeather.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<WeatherCard />);
    expect(screen.getByText(/waiting for live data/i)).toBeInTheDocument();
  });

  it('renders ErrorState when there is an error', () => {
    mockedUseWeather.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('API Down'),
    });

    render(<WeatherCard />);
    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });

  it('renders full weather details on success', () => {
    mockedUseWeather.mockReturnValue({
      data: {
        city: 'Brisbane',
        temperature: 28,
        unit: 'C',
        condition: 'sunny',
        datetime: '2026-04-22T12:00:00Z',
        humidity: 60,
        chanceOfRain: 10,
        windSpeed: 15,
        windUnit: 'kmh',
        tomorrow: { temperature: 29, condition: 'partly-cloudy' },
      },
      isLoading: false,
      error: null,
    });

    render(<WeatherCard />);

    // Check header/badge
    expect(screen.getAllByText('Brisbane')).toHaveLength(2); // One in Badge, one in text
    expect(screen.getByText('28°')).toBeInTheDocument();

    // Check WeatherItems content
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
  });
});
