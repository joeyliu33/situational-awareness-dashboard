import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RampPieChart from './RampPieChart';

// Import ALGORITHMS to ensure our mock matches the real keys
import { ALGORITHMS } from '../../api/types';

describe('RampPieChart', () => {
  const mockDistribution = ALGORITHMS.reduce((acc, alg, idx) => {
    acc[alg] = idx === 0 ? 100 : 0; // 100% for the first algorithm
    return acc;
  }, {} as any);

  it('renders labels for all algorithms in the legend', () => {
    render(<RampPieChart distribution={mockDistribution} />);

    ALGORITHMS.forEach((alg) => {
      expect(screen.getByText(alg)).toBeInTheDocument();
    });
  });

  it('displays the percentage values correctly in the legend', () => {
    render(<RampPieChart distribution={mockDistribution} />);
    // Algorithm 1 should show 100%
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
