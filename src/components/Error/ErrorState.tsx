import React from 'react';

interface ErrorStateProps {
  errorMessage?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  errorMessage = 'An error occurred while fetching data...',
}) => {
  return (
    <div className="h-full flex items-center justify-center text-sm text-slate-500">
      {errorMessage}
    </div>
  );
};

export default ErrorState;
