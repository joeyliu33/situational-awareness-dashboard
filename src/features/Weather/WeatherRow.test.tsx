import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WeatherRow } from './WeatherRow';

describe('WeatherRow Component', () => {
  it('renders basic label and value', () => {
    render(<WeatherRow label="Humidity" value="65%" />);
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('renders unit separately when provided', () => {
    render(<WeatherRow label="Wind" value={12} unit="kmh" />);
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('kmh')).toBeInTheDocument();
  });

  it('renders an icon when weatherCondition is provided', () => {
    const { container } = render(
      <WeatherRow label="Tomorrow" value="30°" weatherCondition="sunny" />
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-yellow-400');
  });
});
