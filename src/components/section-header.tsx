import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  variant?: 'light' | 'dark';
  centered?: boolean;
  children?: ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  variant = 'light',
  centered = true,
  children,
}: SectionHeaderProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`space-y-3 ${centered ? 'text-center' : ''}`}>
      {subtitle && (
        <span
          className={`inline-block rounded-full border px-5 py-2 text-xs font-bold tracking-[0.2em] uppercase shadow-lg ${
            isDark
              ? 'border-amber-500/50 bg-stone-950/50 backdrop-blur-md text-amber-400'
              : 'border-amber-200 bg-amber-50 text-amber-600'
          }`}
        >
          {subtitle}
        </span>
      )}

      <h2
        className={`font-serif text-2xl md:text-3xl font-bold ${
          isDark ? 'text-white drop-shadow-md' : 'text-stone-900'
        }`}
      >
        {title}
      </h2>

      {/* Decorative line */}
      <div
        className={`h-1 w-16 ${centered ? 'mx-auto' : ''} bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]`}
      ></div>

      {description && (
        <p
          className={`${
            isDark ? 'text-stone-400' : 'text-stone-600'
          } max-w-xl ${centered ? 'mx-auto' : ''} text-sm md:text-base font-light`}
        >
          {description}
        </p>
      )}

      {children}
    </div>
  );
}
