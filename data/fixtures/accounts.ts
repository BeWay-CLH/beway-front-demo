import type { Session } from '@/lib/models/session';

/* Cuentas de demostración. Entrar con cualquier correo y contraseña abre la de Lucía.
   Lucía tiene Talent y Admin CLH; Marcos solo Talent, así que el espacio Admin le muestra "sin acceso". */
export const demoAccounts = {
  lucia: {
    userId: 'usr-lucia-martin',
    username: 'lucia-martin',
    displayName: 'Lucía Martín',
    roles: ['talent', 'admin'],
  },
  marcos: {
    userId: 'usr-marcos-gil',
    username: 'marcos-gil',
    displayName: 'Marcos Gil',
    roles: ['talent'],
  },
} satisfies Record<string, Session>;

export type DemoAccountId = keyof typeof demoAccounts;

export function isDemoAccountId(value: string): value is DemoAccountId {
  return Object.hasOwn(demoAccounts, value);
}
