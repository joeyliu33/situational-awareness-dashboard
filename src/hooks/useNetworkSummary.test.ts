import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useNetworkSummary } from './useNetworkSummary';
import getNetworkSummary from '../api/getNetworkSummary';
import { type NetworkSummary } from '../api/types';

// Mock the API module
vi.mock('../api/getNetworkSummary');

const mockedGetSummary = vi.mocked(getNetworkSummary);

// Using your provided data for the mock return
const mockNetworkSummary: NetworkSummary = {
  totalRamps: 50,
  activeRamps: 47,
  incidents: 3,
  averageDelayMinutes: 26,
  alertThresholdPercent: 40,
  currentMaxAlgorithmPercent: 30,
};

describe('useNetworkSummary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with loading state and null data', () => {
    // Return a pending promise to capture the mount state
    mockedGetSummary.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useNetworkSummary());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should successfully fetch and return the network summary object', async () => {
    mockedGetSummary.mockResolvedValue(mockNetworkSummary);

    const { result } = renderHook(() => useNetworkSummary());

    // Wait for the async cleanup
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockNetworkSummary);
    expect(result.current.data?.activeRamps).toBe(47);
    expect(result.current.error).toBeNull();
  });

  it('should handle API failures and store the Error object', async () => {
    const networkError = new Error('Database connection failed');
    mockedGetSummary.mockRejectedValue(networkError);

    const { result } = renderHook(() => useNetworkSummary());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Database connection failed');
    expect(result.current.data).toBeNull();
  });

  it('should wrap non-Error rejections in a fallback Error object', async () => {
    // Edge case: API rejects with a string or raw object
    mockedGetSummary.mockRejectedValue('CRITICAL_FAILURE');

    const { result } = renderHook(() => useNetworkSummary());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error?.message).toBe(
      'Failed to load network summary'
    );
  });

  it('should ensure the API is called exactly once', async () => {
    mockedGetSummary.mockResolvedValue(mockNetworkSummary);

    const { rerender } = renderHook(() => useNetworkSummary());

    rerender(); // Trigger a component update

    expect(mockedGetSummary).toHaveBeenCalledTimes(1);
  });
});
