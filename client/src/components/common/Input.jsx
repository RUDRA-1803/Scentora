import React, { forwardRef } from 'react';

/**
 * Reusable luxury text input with accessible label, error messages, and theme awareness
 */
export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      id,
      className = '',
      type = 'text',
      icon: Icon,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium uppercase tracking-widest text-content-secondary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-content-secondary">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={`
              w-full px-3.5 py-2.5 rounded-luxury text-sm
              bg-surface text-content-primary placeholder:text-content-secondary/60
              border border-themeBorder
              focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
              disabled:opacity-50 disabled:bg-hoverSubtle disabled:cursor-not-allowed
              transition-colors duration-150
              ${Icon ? 'pl-10' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error ? (
          <p className="text-xs text-red-500 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-content-secondary">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Reusable luxury Select input
 */
export const Select = forwardRef(
  ({ label, error, helperText, id, options = [], className = '', ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-medium uppercase tracking-widest text-content-secondary"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={`
            w-full px-3.5 py-2.5 rounded-luxury text-sm
            bg-surface text-content-primary
            border border-themeBorder
            focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
            disabled:opacity-50 disabled:bg-hoverSubtle disabled:cursor-not-allowed
            transition-colors duration-150
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="text-xs text-red-500 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-content-secondary">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Input;
