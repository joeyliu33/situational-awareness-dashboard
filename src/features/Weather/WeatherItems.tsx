import { type WeatherData } from '../../api/types';
import { WeatherRow } from './WeatherRow';

type WeatherItemsProps = Pick<
  WeatherData,
  'humidity' | 'chanceOfRain' | 'windSpeed' | 'windUnit' | 'tomorrow'
>;

const WeatherItems = (props: WeatherItemsProps) => {
  return (
    <div className="flex flex-col">
      <WeatherRow label="Humidity" value={`${props.humidity}%`} />
      <WeatherRow label="Chance of Rain" value={`${props.chanceOfRain}%`} />
      <WeatherRow label="Wind" value={props.windSpeed} unit={props.windUnit} />
      <WeatherRow
        label="Tomorrow"
        value={`${props.tomorrow.temperature}°`}
        weatherCondition={props.tomorrow.condition}
      />
    </div>
  );
};

export default WeatherItems;
