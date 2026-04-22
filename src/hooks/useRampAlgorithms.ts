import { useEffect, useRef, useState, useMemo } from 'react';
import getRampAlgorithms from '../api/getRampAlgorithms';
import {
  type Ramp,
  type Algorithm,
  type AlgorithmDistribution,
  ALGORITHMS,
} from '../api/types';
import {
  rampsToDistribution,
  appendSparklinePoint,
  generateSparklineSeed,
} from '../utils/rampTransforms';

export const useRampAlgorithms = () => {
  const [ramps, setRamps] = useState<Ramp[]>([]);
  const [distribution, setDistribution] =
    useState<AlgorithmDistribution | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // 1. Seed a default background buffer for every algorithm
  const allHistoryRef = useRef<Record<Algorithm, any[]>>({
    'Algorithm 1': generateSparklineSeed({ baseValue: 20 }),
    'Algorithm 2': generateSparklineSeed({ baseValue: 20 }),
    'Algorithm 3': generateSparklineSeed({ baseValue: 20 }),
    'Algorithm 4': generateSparklineSeed({ baseValue: 20 }),
    'Algorithm 5': generateSparklineSeed({ baseValue: 20 }),
  });

  const latestRampsRef = useRef<Ramp[]>([]);

  useEffect(() => {
    const stop = getRampAlgorithms((newRamps) => {
      latestRampsRef.current = newRamps;
      const dist = rampsToDistribution(newRamps);
      const now = Date.now();

      // 2. Update all buffers in the background
      ALGORITHMS.forEach((alg) => {
        allHistoryRef.current[alg] = appendSparklinePoint(
          allHistoryRef.current[alg],
          dist[alg],
          now
        );
      });

      if (!isPaused) {
        setRamps(newRamps);
        setDistribution(dist);
      }
      setIsLoading(false);
    });

    return stop;
  }, [isPaused]);

  // 3. Derived State: Determine the dominant algorithm and pluck its specific history
  const sparkline = useMemo(() => {
    if (!distribution) return null;

    // Find the dominant algorithm based on the current distribution
    const dominantAlg = (
      Object.entries(distribution) as [Algorithm, number][]
    ).reduce((prev, curr) => (curr[1] > prev[1] ? curr : prev))[0];

    return {
      algorithm: dominantAlg,
      percentage: distribution[dominantAlg],
      points: allHistoryRef.current[dominantAlg],
    };
  }, [distribution]); // Recalculates whenever distribution (and thus the dominant algorithm) changes

  const togglePause = () => {
    if (isPaused) {
      const latest = latestRampsRef.current;
      setRamps(latest);
      setDistribution(rampsToDistribution(latest));
    }
    setIsPaused((prev) => !prev);
  };

  return {
    ramps,
    distribution,
    sparkline,
    isLoading,
    isPaused,
    togglePause,
  };
};
