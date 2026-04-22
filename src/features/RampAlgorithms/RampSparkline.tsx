import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { type SparklinePoint } from '../../api/types';

interface RampSparklineProps {
  label: string;
  data: SparklinePoint[];
  currentValue: number;
}

const RampSparkline = ({ label, data, currentValue }: RampSparklineProps) => {
  return (
    <div className="pt-4 border-t border-white/5">
      <div className="flex justify-between items-end mb-1">
        <span className="text-xs uppercase tracking-[0.15em] text-slate-500">
          {label}
        </span>

        <span className="text-sm text-emerald-400 tabular-nums">
          {currentValue}%
        </span>
      </div>

      <div className="h-24 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="sparklineGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <YAxis hide domain={[0, 100]} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#sparklineGradient)`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-xs text-slate-600 mt-1">
        <span>-60s</span>
        <span>now</span>
      </div>
    </div>
  );
};

export default RampSparkline;
