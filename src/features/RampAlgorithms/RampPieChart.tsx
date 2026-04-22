import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { type AlgorithmDistribution, ALGORITHMS } from '../../api/types';

const COLOR_MAP: Record<string, string> = {
  'Algorithm 1': '#10b981',
  'Algorithm 2': '#6366f1',
  'Algorithm 3': '#f59e0b',
  'Algorithm 4': '#ec4899',
  'Algorithm 5': '#3b82f6',
};

interface RampPieChartProps {
  distribution: AlgorithmDistribution;
}

const RampPieChart = ({ distribution }: RampPieChartProps) => {
  // convert record → array (stable order)
  const data = ALGORITHMS.map((alg) => ({
    name: alg,
    value: distribution[alg],
    percentage: distribution[alg],
    fill: COLOR_MAP[alg],
  }));

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percentage,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#94a3b8"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs tabular-nums"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Donut */}
      <div className="w-full md:w-1/2 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              stroke="none"
              isAnimationActive={false}
              label={renderCustomLabel}
              labelLine={false}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="w-full md:w-1/2 flex flex-col space-y-2 px-2 md:pr-4">
        {data.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-slate-400">{item.name}</span>
            </div>

            <span className="text-white tabular-nums">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RampPieChart;
