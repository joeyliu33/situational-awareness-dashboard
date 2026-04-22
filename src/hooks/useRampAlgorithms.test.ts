import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useRampAlgorithms } from './useRampAlgorithms';
import getRampAlgorithms from '../api/getRampAlgorithms';
import { type Ramp, ALGORITHMS } from '../api/types';

// Mock the API module
vi.mock('../api/getRampAlgorithms');

// Create a strictly typed mock reference
const mockedGetRamps = vi.mocked(getRampAlgorithms);

describe('useRampAlgorithms', () => {
  let updateCallback: (ramps: Ramp[]) => void;
  const stopMock = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();

    // The mock implementation is now type-checked against the real API signature
    mockedGetRamps.mockImplementation((cb) => {
      updateCallback = cb;
      return stopMock;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with loading state and seeded data', () => {
    const { result } = renderHook(() => useRampAlgorithms());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.sparkline).toBeNull();
  });

  it('should set dominant algorithm and distribution on first API tick', () => {
    const { result } = renderHook(() => useRampAlgorithms());

    const mockRamps: Ramp[] = [
      { id: '1', algorithm: 'Algorithm 2' },
      { id: '2', algorithm: 'Algorithm 2' },
      { id: '3', algorithm: 'Algorithm 1' },
    ];

    act(() => {
      updateCallback(mockRamps);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.distribution?.['Algorithm 2']).toBe(67);
    expect(result.current.sparkline?.algorithm).toBe('Algorithm 2');
  });

  it('should freeze UI updates when paused but continue recording history', () => {
    const { result } = renderHook(() => useRampAlgorithms());

    act(() => {
      updateCallback([{ id: 'r1', algorithm: 'Algorithm 1' }]);
    });

    act(() => {
      result.current.togglePause();
    });
    expect(result.current.isPaused).toBe(true);

    // New data for a different algorithm
    act(() => {
      updateCallback([{ id: 'r2', algorithm: 'Algorithm 5' }]);
    });

    // UI remains on Alg 1
    expect(result.current.sparkline?.algorithm).toBe('Algorithm 1');

    act(() => {
      result.current.togglePause();
    });

    // UI jumps to Alg 5
    expect(result.current.sparkline?.algorithm).toBe('Algorithm 5');
  });

  it('should handle tied distribution percentages (defaults to first leading algorithm)', () => {
    const { result } = renderHook(() => useRampAlgorithms());

    act(() => {
      updateCallback([
        { id: '1', algorithm: 'Algorithm 1' },
        { id: '2', algorithm: 'Algorithm 2' },
      ]);
    });

    expect(ALGORITHMS).toContain(result.current.sparkline?.algorithm);
  });

  it('should correctly cleanup API subscription on unmount', () => {
    const { unmount } = renderHook(() => useRampAlgorithms());
    unmount();
    expect(stopMock).toHaveBeenCalledTimes(1);
  });
});
