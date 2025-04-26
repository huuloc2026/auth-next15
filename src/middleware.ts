import { ACCESS_TOKEN } from '@/utils/constant';
import {cookies} from 'next/headers';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

const protectedRoutes = ['/protected'];
const publicRoutes = ['/login'];

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|icons|images|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  console.log(path)
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const accessToken = (await cookies()).get(ACCESS_TOKEN)?.value;

  // Forwarding authentication from the client to backend API routes
  if (accessToken && /^\/backend/.test(path)) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Authentication
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  if (isPublicRoute && accessToken && !path.startsWith('/protected')) {
    return NextResponse.redirect(new URL('/protected', req.nextUrl));
  }

  return NextResponse.next();
}