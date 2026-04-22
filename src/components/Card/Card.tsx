import React from 'react';

interface CardProps {
  title: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  badge,
  children,
  className = '',
}) => {
  return (
    <section
      className={`
        bg-[#191d2e]
        rounded-2xl
        border border-white/10
        shadow-2xl
        flex flex-col
        h-full
        min-h-[450px]
        ${className}
      `}
    >
      <div className="px-6 py-5 flex justify-between items-center border-b border-white/5">
        <h2 className="text-slate-500 uppercase tracking-wide">{title}</h2>

        {badge && <div className="flex-shrink-0">{badge}</div>}
      </div>

      <div className="px-6 py-6 flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {children}
      </div>
    </section>
  );
};

export default Card;
