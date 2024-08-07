import { NextResponse } from 'next/server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(request) {
  const { isAuthenticated } = getKindeServerSession(request);
  
  if (!(await isAuthenticated())) {
    const loginUrl = new URL('/api/auth/login', request.url);
    loginUrl.searchParams.set('?post_login_redirect_url/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/details/:path*',
}
