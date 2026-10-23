import React from 'react';

/**
 * Reusable Badge component for luxury status tags and categories
 */
export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 tracking-widest',
    md: 'text-xs px-2.5 py-1 tracking-wider',
  };

  const variantStyles = {
    default: 'bg-hoverSubtle text-content-primary border border-themeBorder',
    gold: 'bg-brand-gold/15 text-accent border border-brand-gold/30',
    primary: 'bg-primary text-primary-foreground',
    outline: 'bg-transparent text-content-secondary border border-themeBorder',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium uppercase rounded-full select-none
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.default}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
