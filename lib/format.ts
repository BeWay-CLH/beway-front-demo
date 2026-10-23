/* Meses con nombre fijo, no Intl: el servidor y el navegador deben pintar exactamente lo mismo (sin errores de hidratación). */
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];

/* "2025-09" → "sept 2025". */
export function formatMonth(value: string): string {
  const [year, month] = value.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/* "2026-02-12" → "12 feb 2026". Sin Intl, por la misma razón que formatMonth. */
export function formatDate(value: string): string {
  const [year, month, day] = value.split('-');
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

/* 1240 → "1.240". Punto como separador de miles desde 1.000, como pide la marca. */
export function formatCount(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/* ["a", "b", "c"] → "a, b y c". "e" en lugar de "y" delante de una palabra que empieza por i. */
export function formatList(items: string[]): string {
  if (items.length <= 1) return items.join('');
  const last = items[items.length - 1];
  return `${items.slice(0, -1).join(', ')} ${/^[iI]/.test(last) ? 'e' : 'y'} ${last}`;
}

/* Periodo de una experiencia o de una formación. Sin fin = en curso. */
export function formatPeriod(start?: string, end?: string): string {
  const to = end ? formatMonth(end) : 'actualidad';
  return start ? `${formatMonth(start)} – ${to}` : to;
}
