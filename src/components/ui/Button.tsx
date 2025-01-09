import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, variant = 'primary', className = '', ...props }, ref) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50';
    const variantStyles = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700',
      secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200',
      danger: 'bg-accent-600 text-white hover:bg-accent-700'
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';