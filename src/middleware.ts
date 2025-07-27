import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // If no access token or refresh token, redirect to login
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If access token exists, proceed (backend will verify)
  if (accessToken) {
    return NextResponse.next();
  }

  // If only refresh token exists, attempt to refresh
  if (refreshToken) {
    try {
      // Fetch CSRF token for refresh request
      const csrfRes = await fetch('http://localhost:5000/api/auth/csrf-token', {
        method: 'GET',
        credentials: 'include',
      });
      const { csrfToken } = await csrfRes.json();

      // Attempt to refresh token
      const response = await fetch('http://localhost:5000/api/auth/refresh', {
        method: 'POST',
        credentials: 'include', // Send refreshToken cookie
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.accessToken) {
          const res = NextResponse.next();
          res.cookies.set('accessToken', data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 15 * 60, // 15 minutes
          });
          return res;
        }
      }

      // Refresh failed, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    } catch (error) {
      console.error('Middleware: Refresh error', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/dashboard/:path*'],
};