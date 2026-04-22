import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useDelayedRoutes } from './useDelayedRoutes';
import getDelayedRoutes from '../api/getDelayedRoutes';
import { type DelayedRoute } from '../api/types';

// Mock the API module
vi.mock('../api/getDelayedRoutes');

const mockedGetRoutes = vi.mocked(getDelayedRoutes);

// Using your actual data for the mock return
const mockDelayedRoutes: DelayedRoute[] = [
  {
    id: 'route-001',
    name: 'Monash Fwy Out',
    via: ['Kings Way', 'EastLink'],
    distanceKm: 13,
    delayMinutes: 45,
    severity: 'high',
  },
  {
    id: 'route-002',
    name: 'Monash Fwy Out',
    via: ['Kings Way', 'EastLink'],
    distanceKm: 15,
    delayMinutes: 28,
    severity: 'high',
  },
  {
    id: 'route-003',
    name: 'Western Ring Rd',
    via: ['West Gate Fwy', 'Western Fwy'],
    distanceKm: 5,
    delayMinutes: 5,
    severity: 'medium',
  },
  {
    id: 'route-004',
    name: 'Eastern Fwy',
    via: ['Hoddle St', 'Springvale Rd'],
    distanceKm: 15,
    delayMinutes: 25,
    severity: 'medium',
  },
];

describe('useDelayedRoutes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with loading state and null data', () => {
    // Return a promise that stays pending to check the initial render state
    mockedGetRoutes.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useDelayedRoutes());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it('should successfully fetch and return the list of delayed routes', async () => {
    mockedGetRoutes.mockResolvedValue(mockDelayedRoutes);

    const { result } = renderHook(() => useDelayedRoutes());

    // Wait for the async effect to resolve
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(4);
    expect(result.current.data?.[0].id).toBe('route-001');
    expect(result.current.data?.[3].severity).toBe('medium');
    expect(result.current.error).toBeNull();
  });

  it('should handle an empty list of routes (no delays)', async () => {
    mockedGetRoutes.mockResolvedValue([]);

    const { result } = renderHook(() => useDelayedRoutes());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual([]);
  });

  it('should capture API errors correctly', async () => {
    const errorResponse = new Error('Failed to fetch from traffic service');
    mockedGetRoutes.mockRejectedValue(errorResponse);

    const { result } = renderHook(() => useDelayedRoutes());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(
      'Failed to fetch from traffic service'
    );
    expect(result.current.data).toBeNull();
  });

  it('should wrap non-Error rejections in a standard Error object', async () => {
    // Testing the fallback logic for non-Error types (e.g., a status object)
    mockedGetRoutes.mockRejectedValue({
      code: 500,
      status: 'Internal Server Error',
    });

    const { result } = renderHook(() => useDelayedRoutes());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error?.message).toBe('Failed to load delayed routes');
  });

  it('should verify the structure of a specific data point', async () => {
    mockedGetRoutes.mockResolvedValue(mockDelayedRoutes);
    const { result } = renderHook(() => useDelayedRoutes());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const route = result.current.data?.[2]; // Western Ring Rd
    expect(route?.name).toBe('Western Ring Rd');
    expect(route?.via).toContain('West Gate Fwy');
    expect(route?.distanceKm).toBe(5);
  });
});
