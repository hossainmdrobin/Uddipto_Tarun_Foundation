
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public paths
  if (
    pathname.startsWith('/api/auth') || 
    pathname.startsWith('/login') || 
    pathname.startsWith('/register') || 
    pathname === '/' ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decoded = await verifyToken(token) as any;
  if (!decoded) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }

  // Member routes
  if (pathname.startsWith('/customer') && decoded.role !== 'member') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Employee routes
  if (pathname.startsWith('/employee') && decoded.role !== 'employee') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/customer/:path*', 
    '/employee/:path*', 
    '/api/customer/:path*', 
    '/api/employee/:path*'
  ],
};
