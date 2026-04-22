import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import LoadingState from '../../components/Loading/LoadingState';
import { useRampAlgorithms } from '../../hooks/useRampAlgorithms';
import RampPieChart from './RampPieChart';
import RampSparkline from './RampSparkline';

const RampAlgorithmsCard = () => {
  const { ramps, distribution, sparkline, isLoading, isPaused, togglePause } =
    useRampAlgorithms();

  if (isLoading || !distribution || !sparkline) {
    return (
      <Card title="Ramp Chart">
        <LoadingState />
      </Card>
    );
  }

  const currentValue =
    sparkline.points[sparkline.points.length - 1]?.value ?? 0;

  return (
    <Card
      title="Ramp Chart"
      badge={<Badge variant="success">{ramps.length} ramps</Badge>}
    >
      <div className="flex flex-col h-full">
        <RampPieChart distribution={distribution} />

        <RampSparkline
          label={`${sparkline.algorithm} — Last 60s`}
          data={sparkline.points}
          currentValue={currentValue}
        />

        <div className="mt-auto pt-3">
          <div className="border-t border-white/5 mb-6" />

          <div className="flex justify-end">
            <button
              onClick={togglePause}
              className="px-6 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/5 transition"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RampAlgorithmsCard;
