import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  price?: string;
  priceLabel?: string;
  features: string[];
  children?: ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

export function ServiceCard({
  icon,
  title,
  subtitle,
  price,
  priceLabel,
  features,
  children,
  variant = 'dark',
  className = '',
}: ServiceCardProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`group ${
        isDark
          ? 'bg-stone-900/60 backdrop-blur-md border border-stone-700/50 hover:border-amber-500/30 hover:bg-stone-900/80'
          : 'bg-white/80 backdrop-blur-md border border-stone-200/80'
      } p-6 md:p-8 rounded-[1.5rem] shadow-2xl flex flex-col transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${className}`}
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 ${
          isDark
            ? 'bg-gradient-to-br from-amber-900/40 to-amber-600/20 border border-amber-700/30'
            : 'bg-amber-50 border border-amber-200'
        } rounded-lg flex items-center justify-center ${isDark ? 'text-amber-500' : 'text-amber-600'} mb-4`}
      >
        {icon}
      </div>

      {/* Title and Subtitle */}
      <h3 className={`font-serif text-xl md:text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>
        {title}
      </h3>
      {subtitle && (
        <p
          className={`${
            isDark ? 'text-amber-500' : 'text-amber-600'
          } font-bold text-[10px] tracking-widest uppercase mb-4`}
        >
          {subtitle}
        </p>
      )}

      {/* Price */}
      {price && (
        <div className="flex items-end gap-1.5 mb-4">
          <div className={`text-3xl md:text-4xl font-extrabold tracking-tighter ${isDark ? 'text-white' : 'text-stone-900'}`}>
            {price}
          </div>
          {priceLabel && (
            <div className={`mb-1 text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              {priceLabel}
            </div>
          )}
        </div>
      )}

      {/* Features */}
      <ul className={`space-y-3 flex-grow text-xs md:text-sm ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className={`${isDark ? 'text-amber-500' : 'text-amber-600'} shrink-0`}>✦</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Children (usually action button) */}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
