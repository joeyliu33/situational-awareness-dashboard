import { useWeather } from '../../hooks/useWeather';
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import LoadingState from '../../components/Loading/LoadingState';
import ErrorState from '../../components/Error/ErrorState';
import WeatherItems from './WeatherItems';
import { getWeatherIcon } from './WeatherIcon';
import { formatDate } from '../../utils/dateFormatter';

const WeatherCard = () => {
  const { data, isLoading, error } = useWeather();

  if (isLoading)
    return (
      <Card title="Weather">
        <LoadingState />
      </Card>
    );

  if (error || !data) {
    return (
      <Card title="Weather">
        <ErrorState />
      </Card>
    );
  }

  return (
    <Card title="Weather" badge={<Badge variant="success">{data.city}</Badge>}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="text-lg text-slate-500">{data.city}</div>

            <div className="text-7xl font-light tracking-tight text-white leading-none mt-2">
              {data.temperature}°
            </div>

            <div className="text-medium text-slate-500 mt-3">
              {formatDate(new Date(data.datetime))}
            </div>
          </div>

          <div className="mt-3">
            {getWeatherIcon(data.condition, { size: 56 })}
          </div>
        </div>

        <div className="mt-6">
          <WeatherItems
            humidity={data.humidity}
            chanceOfRain={data.chanceOfRain}
            windSpeed={data.windSpeed}
            windUnit={data.windUnit}
            tomorrow={data.tomorrow}
          />
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
