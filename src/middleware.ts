import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Case-sensitive redirect: /viewAll → /viewall
  if (pathname === '/viewAll') {
    return NextResponse.redirect(new URL('/viewall', request.url), 308);
  }

  // Redirect bare /blogs/singleBlog (no id) and the literal /undefined variant → /blogs
  if (pathname === '/blogs/singleBlog' || pathname === '/blogs/singleBlog/undefined') {
    return NextResponse.redirect(new URL('/blogs', request.url), 308);
  }
}

export const config = {
  matcher: ['/viewAll', '/blogs/singleBlog', '/blogs/singleBlog/undefined'],
};
