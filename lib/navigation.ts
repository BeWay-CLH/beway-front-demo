export const DEFAULT_AFTER_LOGIN = '/talent/dashboard';

/* Solo rutas internas. Evita que ?next= lleve a otro sitio (redirección abierta) o vuelva al acceso en bucle. */
export function safeNext(value: string | null | undefined): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return DEFAULT_AFTER_LOGIN;
  if (value === '/login' || value.startsWith('/login?')) return DEFAULT_AFTER_LOGIN;
  return value;
}
