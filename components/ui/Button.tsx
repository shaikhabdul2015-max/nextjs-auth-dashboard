import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils.ts';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium tracking-tight rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98] duration-150 cursor-pointer';

    const variants = {
      primary:
        'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm border border-neutral-900',
      secondary:
        'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200/80',
      outline:
        'border border-neutral-300 bg-transparent text-neutral-800 hover:bg-neutral-50',
      ghost:
        'bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
      destructive:
        'bg-rose-600 text-white hover:bg-rose-700 shadow-sm border border-rose-600',
    };

    const sizes = {
      sm: 'text-xs h-8 px-3 py-1.5 gap-1.5',
      md: 'text-sm h-10 px-4 py-2 gap-2',
      lg: 'text-base h-11 px-5 py-2.5 gap-2.5',
      icon: 'h-9 w-9 p-0 flex items-center justify-center',
    };

    const elementId = id || `btn-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <button
        id={elementId}
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
