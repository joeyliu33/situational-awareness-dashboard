import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Waiting for live data...',
}) => {
  return (
    <div className="h-full flex items-center justify-center text-sm text-slate-500">
      {message}
    </div>
  );
};

export default LoadingState;
