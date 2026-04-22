import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WeatherItems from './WeatherItems';

describe('WeatherItems Component', () => {
  const mockProps = {
    humidity: 75,
    chanceOfRain: 20,
    windSpeed: 12,
    windUnit: 'km/h',
    tomorrow: {
      temperature: 31,
      condition: 'sunny' as const,
    },
  };

  it('renders all weather rows with correct labels', () => {
    render(<WeatherItems {...mockProps} />);

    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('Chance of Rain')).toBeInTheDocument();
    expect(screen.getByText('Wind')).toBeInTheDocument();
    expect(screen.getByText('Tomorrow')).toBeInTheDocument();
  });

  it('formats and displays values correctly', () => {
    render(<WeatherItems {...mockProps} />);

    // Verify percentages are appended
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();

    // Verify wind speed and unit
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('km/h')).toBeInTheDocument();

    // Verify tomorrow's temperature formatting
    expect(screen.getByText('31°')).toBeInTheDocument();
  });

  it('renders the weather icon for the tomorrow row', () => {
    const { container } = render(<WeatherItems {...mockProps} />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-yellow-400');
  });
});
