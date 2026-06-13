import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public paths
  if (pathname.startsWith('/api/auth') || pathname.startsWith('/login') || pathname.startsWith('/register') || pathname === '/') {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decoded = verifyToken(token) as any;
  if (!decoded) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Customer routes
  if (pathname.startsWith('/customer') && decoded.role !== 'customer') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Employee routes
  if (pathname.startsWith('/employee') && decoded.role !== 'employee') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/customer/:path*', '/employee/:path*', '/api/customer/:path*', '/api/employee/:path*'],
};
