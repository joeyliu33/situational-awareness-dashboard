import { type WeatherData } from './types';
import { weatherData } from '../data/weather';

/**
 * Mock weather API.
 * In a real app this would hit a REST endpoint.
 * Returns a promise so callers can swap it for a real fetch with no changes.
 */
async function getWeather(): Promise<WeatherData> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 80));
  return weatherData;
}

export default getWeather;
