import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NetworkSummaryItemCard from './NetworkSummaryItemCard';

describe('NetworkSummaryItemCard', () => {
  it('renders the label and value', () => {
    render(
      <NetworkSummaryItemCard label="Test" value="100" severity="neutral" />
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders the unit when provided', () => {
    render(
      <NetworkSummaryItemCard
        label="T"
        value="5"
        unit="min"
        severity="neutral"
      />
    );
    expect(screen.getByText('min')).toBeInTheDocument();
  });

  it('applies the medium severity color (amber)', () => {
    render(<NetworkSummaryItemCard label="T" value="5" severity="medium" />);
    const valueElement = screen.getByText('5');
    expect(valueElement).toHaveClass('text-amber-400');
  });

  it('applies the high severity color (red)', () => {
    render(<NetworkSummaryItemCard label="T" value="Alert" severity="high" />);
    const valueElement = screen.getByText('Alert');
    expect(valueElement).toHaveClass('text-red-500');
  });
});
