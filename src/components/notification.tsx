'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
}

export function Notification({
  type,
  title,
  message,
  duration = 4000,
  onClose,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      title: 'text-green-900',
      message: 'text-green-700',
      button: 'hover:bg-green-100',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      title: 'text-red-900',
      message: 'text-red-700',
      button: 'hover:bg-red-100',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-900',
      message: 'text-blue-700',
      button: 'hover:bg-blue-100',
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: 'text-amber-600',
      title: 'text-amber-900',
      message: 'text-amber-700',
      button: 'hover:bg-amber-100',
    },
  };

  const style = styles[type];
  const Icon =
    type === 'success'
      ? CheckCircle
      : type === 'error'
        ? AlertCircle
        : type === 'warning'
          ? AlertCircle
          : Info;

  return (
    <div
      className={`${style.bg} border ${style.border} rounded-xl p-4 shadow-lg flex items-start gap-3 animate-fade-in-up`}
      role="alert"
    >
      <Icon className={`${style.icon} shrink-0 mt-0.5`} size={20} />
      <div className="flex-1 min-w-0">
        <h3 className={`${style.title} font-bold text-sm`}>{title}</h3>
        {message && <p className={`${style.message} text-xs mt-1`}>{message}</p>}
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className={`${style.button} text-gray-400 hover:text-gray-600 transition-colors shrink-0 p-1 rounded`}
        aria-label="Cerrar notificación"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function useNotification() {
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  const show = (props: NotificationProps) => {
    setNotification(props);
  };

  const hide = () => {
    setNotification(null);
  };

  return { notification, show, hide };
}
