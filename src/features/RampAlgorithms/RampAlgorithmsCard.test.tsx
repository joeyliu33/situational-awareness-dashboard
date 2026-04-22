import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import RampAlgorithmsCard from './RampAlgorithmsCard';
import { useRampAlgorithms } from '../../hooks/useRampAlgorithms';
import React from 'react';

// Mock Recharts to avoid ResponsiveContainer width/height issues in JSDOM
vi.mock('recharts', async () => {
  const original = await vi.importActual('recharts');
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: '800px', height: '800px' }}>{children}</div>
    ),
  };
});

vi.mock('../../hooks/useRampAlgorithms');
const mockedUseRamp = vi.mocked(useRampAlgorithms);

describe('RampAlgorithmsCard', () => {
  // Fully typed mock data to satisfy the Ramp and WeatherData interfaces
  const mockData = {
    ramps: [
      { id: '1', algorithm: 'Algorithm 1' as const },
      { id: '2', algorithm: 'Algorithm 2' as const },
      { id: '3', algorithm: 'Algorithm 1' as const },
    ],
    distribution: {
      'Algorithm 1': 40,
      'Algorithm 2': 60,
      'Algorithm 3': 0,
      'Algorithm 4': 0,
      'Algorithm 5': 0,
    },
    sparkline: {
      algorithm: 'Algorithm 1' as const,
      percentage: 25,
      points: [
        { timestamp: 1, value: 10 },
        { timestamp: 2, value: 25 },
      ],
    },
    isLoading: false,
    isPaused: false,
    togglePause: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders LoadingState when isLoading is true', () => {
    mockedUseRamp.mockReturnValue({
      ...mockData,
      isLoading: true,
      distribution: null,
      sparkline: null,
    });

    render(<RampAlgorithmsCard />);
    expect(screen.getByText(/waiting for live data/i)).toBeInTheDocument();
  });

  it('renders the correct number of ramps in the badge', () => {
    mockedUseRamp.mockReturnValue(mockData);
    render(<RampAlgorithmsCard />);

    // The badge should display the length of the ramps array
    expect(screen.getByText('3 ramps')).toBeInTheDocument();
  });

  it('displays the current sparkline value from the last data point', () => {
    mockedUseRamp.mockReturnValue(mockData);
    render(<RampAlgorithmsCard />);

    // The component calculates currentValue from the last point (value: 25)
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('calls togglePause when the button is clicked', () => {
    mockedUseRamp.mockReturnValue(mockData);
    render(<RampAlgorithmsCard />);

    const button = screen.getByRole('button', { name: /pause/i });
    fireEvent.click(button);

    expect(mockData.togglePause).toHaveBeenCalledTimes(1);
  });

  it('toggles button text based on isPaused state', () => {
    const { rerender } = render(<RampAlgorithmsCard />);

    // Test Pause state
    mockedUseRamp.mockReturnValue({ ...mockData, isPaused: false });
    rerender(<RampAlgorithmsCard />);
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();

    // Test Resume state
    mockedUseRamp.mockReturnValue({ ...mockData, isPaused: true });
    rerender(<RampAlgorithmsCard />);
    expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();
  });

  it('renders the specific algorithm label in the sparkline section', () => {
    mockedUseRamp.mockReturnValue(mockData);
    render(<RampAlgorithmsCard />);

    expect(screen.getByText(/Algorithm 1 — Last 60s/i)).toBeInTheDocument();
  });
});
