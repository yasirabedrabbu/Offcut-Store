import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline' | 'ghost';
};

export function Button({ variant = 'solid', className = '', ...props }: ButtonProps) {
  return <button className={`button button-${variant} ${className}`} {...props} />;
}
