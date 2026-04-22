import { Sun, Cloud } from 'lucide-react';
import type { WeatherCondition } from '../../api/types';

interface IconProps {
  size?: number;
  className?: string;
}

export const getWeatherIcon = (
  condition: WeatherCondition,
  { size = 20, className = '' }: IconProps = {}
) => {
  switch (condition) {
    case 'sunny':
      return <Sun size={size} className={`text-yellow-400 ${className}`} />;

    case 'partly-cloudy':
      return <Cloud size={size} className={`text-slate-400 ${className}`} />;

    default:
      return null;
  }
};
