
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebaseIdToken');
  const { pathname } = request.nextUrl;

  // Allow access to the login page
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Redirect to login if no token and trying to access a protected route
  if (!token && pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Allow access if token exists
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
