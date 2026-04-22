import React from 'react';

type BadgeVariant = 'success' | 'warning';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  success: 'bg-emerald-400/10 text-emerald-400',
  warning: 'bg-amber-400/20 text-amber-500',
};

const Badge: React.FC<BadgeProps> = ({ children, variant = 'success' }) => {
  return (
    <span
      className={`
      text-sm px-4 py-1 rounded-full whitespace-nowrap
      ${VARIANT_CLASS[variant]}
    `}
    >
      {children}
    </span>
  );
};

export default Badge;
