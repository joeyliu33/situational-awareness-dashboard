import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RampSparkline from './RampSparkline';

describe('RampSparkline', () => {
  const props = {
    label: 'Algorithm 1 — Last 60s',
    data: [{ timestamp: 1, value: 50 }],
    currentValue: 50,
  };

  it('renders the label and current value', () => {
    render(<RampSparkline {...props} />);
    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders the time scale markers', () => {
    render(<RampSparkline {...props} />);
    expect(screen.getByText('-60s')).toBeInTheDocument();
    expect(screen.getByText('now')).toBeInTheDocument();
  });
});
