import React from 'react';

/**
 * Reusable Card component respecting Scentora luxury design system
 */
export const Card = ({
  children,
  className = '',
  elevated = false,
  bordered = true,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        ${elevated ? 'bg-surface-elevated shadow-elevated' : 'bg-surface shadow-card'}
        ${bordered ? 'border border-themeBorder' : ''}
        rounded-card p-6 transition-all duration-200
        ${onClick ? 'cursor-pointer hover:border-accent hover:-translate-y-0.5' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`border-b border-themeBorder pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`font-serif text-xl font-semibold text-content-primary tracking-tight ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-content-secondary mt-1 font-sans ${className}`}>
    {children}
  </p>
);

export default Card;
