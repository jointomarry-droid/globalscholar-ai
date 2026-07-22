import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  // Client-side auth is handled by AuthGuard components
  // This proxy just ensures proper routing
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
