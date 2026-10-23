import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/models/session';

/* Redirección optimista: sin cookie de sesión, los espacios privados van al acceso con ?next=.
   No es seguridad. Cada operación la autoriza el backend (BE-001, BE-003). */
export function proxy(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next();
  const login = new URL('/login', request.url);
  login.searchParams.set('next', request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ['/talent/:path*', '/admin/:path*'],
};
