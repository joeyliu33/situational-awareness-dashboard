type CardSeverity = 'low' | 'medium' | 'high' | 'neutral';

interface NetworkSummaryItemCardProps {
  label: string;
  value: number | string;
  unit?: string;
  severity: CardSeverity;
}

const SEVERITY_COLOR: Record<CardSeverity, string> = {
  neutral: 'text-slate-200',
  low: 'text-emerald-400',
  medium: 'text-amber-400',
  high: 'text-red-500',
};

const NetworkSummaryItemCard = ({
  label,
  value,
  unit,
  severity,
}: NetworkSummaryItemCardProps) => {
  return (
    <div className="bg-[#0f1116] rounded-xl p-5 flex flex-col justify-between min-h-[120px]">
      <div className="text-medium font-light text-slate-500">{label}</div>

      <div className="flex items-baseline gap-1">
        <span
          className={`text-4xl font-normal tracking-tight ${SEVERITY_COLOR[severity]}`}
        >
          {value}
        </span>

        {unit && (
          <span className="text-base font-medium text-slate-500 tabular-nums">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default NetworkSummaryItemCard;
