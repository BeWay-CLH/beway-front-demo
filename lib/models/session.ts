/* Sesión de la demo. Identidad y roles reales llegan con el backend (BE-001). */

export type Role = 'talent' | 'company' | 'admin';

export type Session = {
  userId: string;
  username: string;
  displayName: string;
  roles: Role[];
};

/* Cookie de la demo: guarda el id de una cuenta de ejemplo. No es un token ni autoriza nada real. */
export const SESSION_COOKIE = 'bw_demo';
