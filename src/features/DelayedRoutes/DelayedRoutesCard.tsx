import Badge from '../../components/Badge/Badge';
import Card from '../../components/Card/Card';
import ErrorState from '../../components/Error/ErrorState';
import LoadingState from '../../components/Loading/LoadingState';
import { useDelayedRoutes } from '../../hooks/useDelayedRoutes';
import DelayedRoutesItem from './DelayedRoutesItem';

const DelayedRoutesCard = () => {
  const { data, isLoading, error } = useDelayedRoutes();

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
    <Card
      title="Delayed Routes"
      badge={<Badge variant="warning">{data.length} active</Badge>}
    >
      <div className="space-y-4">
        {data.map((route) => (
          <DelayedRoutesItem
            name={route.name}
            via={route.via}
            distanceKm={route.distanceKm}
            delayMinutes={route.delayMinutes}
            severity={route.severity}
          />
        ))}
      </div>
    </Card>
  );
};

export default DelayedRoutesCard;
