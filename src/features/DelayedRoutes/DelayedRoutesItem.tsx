import { SEVERITY_CLASS, type Severity } from '../../api/types';

interface DelayedRoutesItemProps {
  name: string;
  via: string[];
  distanceKm: number;
  delayMinutes: number;
  severity: Severity;
}

const DelayedRoutesItem = ({
  name,
  via,
  distanceKm,
  delayMinutes,
  severity,
}: DelayedRoutesItemProps) => {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-white/5 last:border-b-0">
      <span
        className={`w-3 h-3 rounded-full flex-shrink-0 mt-1.5 ${SEVERITY_CLASS[severity]}`}
      />

      <div className="flex-1 min-w-0">
        <div className="text-lg text-slate-200">{name}</div>
        <div className="text-medium text-slate-500 mt-0.5">
          {via.join(' · ')}
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <div className="text-sm text-slate-500 mb-0.5">{distanceKm} km</div>
        <div className="flex items-baseline gap-0.5">
          <span className="text-3xl font-light text-slate-200">
            {delayMinutes}
          </span>
          <span className="text-xs text-slate-500">min</span>
        </div>
      </div>
    </div>
  );
};

export default DelayedRoutesItem;
