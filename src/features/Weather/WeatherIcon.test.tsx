import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { getWeatherIcon } from './WeatherIcon';

describe('getWeatherIcon Utility', () => {
  it('returns a yellow sun icon for sunny condition', () => {
    const { container } = render(getWeatherIcon('sunny', { size: 40 }));
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-yellow-400');
    expect(svg).toHaveAttribute('width', '40');
  });

  it('returns a slate cloud icon for partly-cloudy condition', () => {
    const { container } = render(getWeatherIcon('partly-cloudy'));
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-slate-400');
  });

  it('returns null for unknown conditions', () => {
    // @ts-expect-error - Testing runtime safety for invalid input
    const icon = getWeatherIcon('stormy');
    expect(icon).toBeNull();
  });
});
