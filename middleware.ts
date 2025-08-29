import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl
  
  // Alleen shop.minous.app toont de webshop
  if (hostname === 'shop.minous.app') {
    // Voor shop.minous.app, toon webshop
    return NextResponse.next()
  }
  
  // Voor lu.minous.app, behoud originele website
  if (hostname === 'lu.minous.app') {
    // Behoud originele website functionaliteit
    return NextResponse.next()
  }
  
  // Voor hoofddomein minous.app, toon originele website
  if (hostname === 'minous.app') {
    // Behoud originele website functionaliteit
    return NextResponse.next()
  }
  
  return NextResponse.next()
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
}
