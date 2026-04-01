/**
 * Utilidades para formatear fechas en formato latinoamericano (DD/MM/YYYY)
 */

/**
 * Formatea una fecha al formato DD/MM/YYYY
 * @param date - Fecha a formatear (string ISO o Date object)
 * @returns Fecha formateada como DD/MM/YYYY
 */
export function formatDateLatam(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Fecha inválida';
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Formatea una fecha con hora en formato DD/MM/YYYY HH:MM
 * @param date - Fecha a formatear
 * @returns Fecha y hora formateadas
 */
export function formatDateTimeLatam(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Fecha inválida';
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Calcula la diferencia en días entre dos fechas
 * @param date1 - Primera fecha
 * @param date2 - Segunda fecha
 * @returns Diferencia en días (positivo si date1 > date2)
 */
export function getDaysDifference(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((date1.getTime() - date2.getTime()) / oneDay);
}

/**
 * Verifica si una fecha ha vencido
 * @param date - Fecha a verificar
 * @returns true si la fecha ha vencido, false si aún es válida
 */
export function isDateExpired(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj < new Date();
}

/**
 * Obtiene el estado de una fecha de vencimiento
 * @param date - Fecha de vencimiento
 * @returns Objeto con estado y mensaje
 */
export function getExpirationStatus(date: string | Date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const daysLeft = getDaysDifference(dateObj, today);

  if (daysLeft < 0) {
    return {
      status: 'expired',
      message: `Vencido hace ${Math.abs(daysLeft)} días`,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    };
  } else if (daysLeft === 0) {
    return {
      status: 'today',
      message: 'Vence hoy',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    };
  } else if (daysLeft <= 7) {
    return {
      status: 'soon',
      message: `Vence en ${daysLeft} días`,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    };
  } else {
    return {
      status: 'valid',
      message: `Vence en ${daysLeft} días`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    };
  }
}
