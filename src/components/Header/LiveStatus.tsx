import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/dateFormatter';

const LiveStatus = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <span
        className={
          'px-4 py-1 bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 rounded-full uppercase'
        }
      >
        live
      </span>
      <span className="text-slate-500 tracking-wider">{formatDate(time)}</span>
    </div>
  );
};

export default LiveStatus;
