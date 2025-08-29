import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl
  
  // Voor shop.minous.app, redirect naar lu.minous.app/shop
  if (hostname === 'shop.minous.app') {
    const newUrl = new URL(`/shop${pathname}`, 'https://lu.minous.app')
    return NextResponse.redirect(newUrl, 301)
  }
  
  // Voor lu.minous.app, behoud originele functionaliteit
  if (hostname === 'lu.minous.app') {
    // Behoud originele website functionaliteit
    return NextResponse.next()
  }
  
  // Voor hoofddomein minous.app
  if (hostname === 'minous.app') {
    // Als het /shop route is, toon webshop
    if (pathname.startsWith('/shop')) {
      return NextResponse.next()
    }
    // Anders behoud originele website
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
