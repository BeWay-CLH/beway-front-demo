/* Meses con nombre fijo, no Intl: el servidor y el navegador deben pintar exactamente lo mismo (sin errores de hidratación). */
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];

/* "2025-09" → "sept 2025". */
export function formatMonth(value: string): string {
  const [year, month] = value.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/* Periodo de una experiencia o de una formación. Sin fin = en curso. */
export function formatPeriod(start?: string, end?: string): string {
  const to = end ? formatMonth(end) : 'actualidad';
  return start ? `${formatMonth(start)} – ${to}` : to;
}
