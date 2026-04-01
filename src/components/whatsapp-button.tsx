import Link from 'next/link';
import { ReactNode } from 'react';

interface WhatsAppButtonProps {
  waNumber: string;
  message: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

export function WhatsAppButton({
  waNumber,
  message,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
}: WhatsAppButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 rounded-lg font-bold transition-all active:scale-95';
  
  const variants = {
    primary: 'bg-amber-600 text-white hover:bg-amber-500 hover:scale-105 shadow-lg shadow-amber-900/50 hover:shadow-xl',
    secondary: 'bg-amber-600/20 text-amber-400 border border-amber-500/30 hover:bg-amber-600 hover:text-white hover:border-amber-600',
    outline: 'border border-stone-600/50 text-stone-300 hover:bg-stone-600 hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs md:text-sm',
    md: 'px-6 py-3 text-sm md:text-base',
    lg: 'px-8 py-4 text-base md:text-lg',
  };

  return (
    <Link
      href={`https://wa.me/${waNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {icon}
    </Link>
  );
}
