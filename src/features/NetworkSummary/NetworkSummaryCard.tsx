import Card from '../../components/Card/Card';
import ErrorState from '../../components/Error/ErrorState';
import LoadingState from '../../components/Loading/LoadingState';
import { useNetworkSummary } from '../../hooks/useNetworkSummary';
import NetworkSummaryItemCard from './NetworkSummaryItemCard';

const NetworkSummaryCard = () => {
  const { data, isLoading, error } = useNetworkSummary();

  if (isLoading)
    return (
      <Card title="Delayed Routes">
        <LoadingState />
      </Card>
    );
  if (error || !data) {
    return (
      <Card title="Delayed Routes">
        <ErrorState />
      </Card>
    );
  }

  return (
    <Card title="Network Summary">
      <div className="grid grid-cols-2 gap-4 px-4">
        <NetworkSummaryItemCard
          label="Total ramps"
          value={data.totalRamps}
          severity="neutral"
        />
        <NetworkSummaryItemCard
          label="Active"
          value={data.activeRamps}
          severity="low"
        />
        <NetworkSummaryItemCard
          label="Incidents"
          value={data.incidents}
          severity="medium"
        />
        <NetworkSummaryItemCard
          label="Avg delay"
          value={data.averageDelayMinutes}
          unit="min"
          severity="neutral"
        />
      </div>
    </Card>
  );
};

export default NetworkSummaryCard;
