import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import DelayedRoutesCard from './DelayedRoutesCard';
import { useDelayedRoutes } from '../../hooks/useDelayedRoutes';
import type { DelayedRoute, Severity } from '../../api/types';

// 1. Mock the custom hook
vi.mock('../../hooks/useDelayedRoutes');
const mockedUseRoutes = vi.mocked(useDelayedRoutes);

describe('DelayedRoutesCard', () => {
  // 2. Add 'id' to each mock route to satisfy the DelayedRoute interface
  const mockRoutes: DelayedRoute[] = [
    {
      id: 'route-1',
      name: 'M1 Pacific Mwy',
      via: ['Eight Mile Plains', 'Rochedale'],
      distanceKm: 12.5,
      delayMinutes: 8,
      severity: 'medium',
    },
    {
      id: 'route-2',
      name: 'Gympie Rd',
      via: ['Chermside'],
      distanceKm: 4.2,
      delayMinutes: 15,
      severity: 'high' satisfies Severity,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders LoadingState initially', () => {
    mockedUseRoutes.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<DelayedRoutesCard />);
    expect(screen.getByText(/waiting for live data/i)).toBeInTheDocument();
  });

  it('renders ErrorState when hook returns an error', () => {
    mockedUseRoutes.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Network failure'),
    });

    render(<DelayedRoutesCard />);
    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });

  it('renders the badge with the correct active count', () => {
    mockedUseRoutes.mockReturnValue({
      data: mockRoutes,
      isLoading: false,
      error: null,
    });

    render(<DelayedRoutesCard />);

    // Checks the badge variant and text
    expect(screen.getByText('2 active')).toBeInTheDocument();
  });

  it('renders all route items from the data array', () => {
    mockedUseRoutes.mockReturnValue({
      data: mockRoutes,
      isLoading: false,
      error: null,
    });

    render(<DelayedRoutesCard />);

    // Check names
    expect(screen.getByText('M1 Pacific Mwy')).toBeInTheDocument();
    expect(screen.getByText('Gympie Rd')).toBeInTheDocument();

    // Check mapped 'via' strings
    expect(
      screen.getByText('Eight Mile Plains · Rochedale')
    ).toBeInTheDocument();

    // Check delay values
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });
});
