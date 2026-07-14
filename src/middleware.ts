import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Case-sensitive redirect: /viewAll → /viewall
  // Uses exact === match so /viewall itself is never caught (prevents loop)
  if (request.nextUrl.pathname === '/viewAll') {
    return NextResponse.redirect(new URL('/viewall', request.url), 308);
  }
}

export const config = {
  matcher: ['/viewAll'],
};
