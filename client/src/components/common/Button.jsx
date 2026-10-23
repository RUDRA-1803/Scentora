import React from 'react';

/**
 * Reusable Button component for Scentora luxury design system
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-[4px] gap-1.5 tracking-wider uppercase',
    md: 'text-sm px-5 py-2.5 rounded-[4px] gap-2 tracking-wide',
    lg: 'text-base px-7 py-3.5 rounded-[4px] gap-2.5 tracking-wide',
  };

  const variantStyles = {
    primary:
      'bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.99] shadow-subtle',
    secondary:
      'bg-surface border border-themeBorder text-content-primary hover:bg-hoverSubtle hover:border-accent active:scale-[0.99]',
    outline:
      'bg-transparent border border-accent text-accent hover:bg-hoverSubtle active:scale-[0.99]',
    ghost:
      'bg-transparent text-content-primary hover:bg-hoverSubtle hover:text-accent',
    gold:
      'bg-brand-gold text-brand-charcoal hover:bg-[#c9a365] active:scale-[0.99] font-semibold shadow-subtle',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.primary}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
