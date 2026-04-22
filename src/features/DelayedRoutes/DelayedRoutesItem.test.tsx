import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DelayedRoutesItem from './DelayedRoutesItem';

// Mock SEVERITY_CLASS if it's not exported/available in scope
vi.mock('../../api/types', async () => {
  const actual = await vi.importActual('../../api/types');
  return {
    ...actual,
    SEVERITY_CLASS: {
      low: 'bg-emerald-400',
      medium: 'bg-amber-400',
      high: 'bg-red-500',
    },
  };
});

describe('DelayedRoutesItem', () => {
  it('formats the "via" array with separators', () => {
    render(
      <DelayedRoutesItem
        name="Test Route"
        via={['Point A', 'Point B']}
        distanceKm={10}
        delayMinutes={5}
        severity="low"
      />
    );
    expect(screen.getByText('Point A · Point B')).toBeInTheDocument();
  });

  it('applies the correct severity color class', () => {
    const { container } = render(
      <DelayedRoutesItem
        name="Test Route"
        via={[]}
        distanceKm={10}
        delayMinutes={5}
        severity="high"
      />
    );
    // Find the status dot (the first span)
    const dot = container.querySelector('span');
    expect(dot).toHaveClass('bg-red-500');
  });
});
