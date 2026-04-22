import { type DelayedRoute } from './types';
import { delayedRoutes } from '../data/delayedRoutes';

/**
 * Mock delayed-routes API.
 * Returns a promise so callers can swap it for a real fetch with no changes.
 */
async function getDelayedRoutes(): Promise<DelayedRoute[]> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return delayedRoutes;
}

export default getDelayedRoutes;
