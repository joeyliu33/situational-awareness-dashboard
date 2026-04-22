import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import NetworkSummaryCard from './NetworkSummaryCard';
import { useNetworkSummary } from '../../hooks/useNetworkSummary';

vi.mock('../../hooks/useNetworkSummary');
const mockedUseNetworkSummary = vi.mocked(useNetworkSummary);

describe('NetworkSummaryCard', () => {
  it('renders all four summary metrics correctly', () => {
    mockedUseNetworkSummary.mockReturnValue({
      data: {
        totalRamps: 50,
        activeRamps: 42,
        incidents: 3,
        averageDelayMinutes: 5.5,
        alertThresholdPercent: 20,
        currentMaxAlgorithmPercent: 25,
      },
      isLoading: false,
      error: null,
    });

    render(<NetworkSummaryCard />);

    expect(screen.getByText('Total ramps')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Incidents')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Avg delay')).toBeInTheDocument();
    expect(screen.getByText('5.5')).toBeInTheDocument();
  });
});
