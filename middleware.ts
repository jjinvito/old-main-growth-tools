import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest) => {
  const { nextUrl } = req;
  const isLoggedIn = !!(req as any).auth;;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // Instead of returning null, do nothing or handle differently
    return NextResponse.next();
  }
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  // If none of the conditions are met, proceed with the request
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Include paths that require authentication
    "/dashboard/:path*",
    "/profile/:path*",
    // Add more patterns as needed
  ],
};
