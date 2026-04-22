import { getWeatherIcon } from './WeatherIcon';
import { type WeatherCondition } from '../../api/types';

interface WeatherRowProps {
  label: string;
  value: number | string;
  unit?: string;
  weatherCondition?: WeatherCondition;
}

export const WeatherRow = ({
  label,
  value,
  unit,
  weatherCondition,
}: WeatherRowProps) => {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-medium font-light text-slate-500">{label}</span>
      <div className="flex item-center gap-0.5">
        <span className="text-slate-200">{value}</span>
        {unit && (
          <span className="ml-0.5 text-slate-500 lowercase">{unit}</span>
        )}
        {weatherCondition && (
          <span className="ml-1 flex items-center">
            {getWeatherIcon(weatherCondition, { size: 20 })}
          </span>
        )}
      </div>
    </div>
  );
};
