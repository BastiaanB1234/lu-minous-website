import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl
  
  // Als het hoofddomein is en niet al op /shop route
  if (hostname === 'minous.app' && !pathname.startsWith('/shop')) {
    // Redirect naar webshop subdomein
    const shopUrl = `https://shop.minous.app${pathname === '/' ? '/shop' : `/shop${pathname}`}`
    return NextResponse.redirect(shopUrl)
  }
  
  // Als het subdomein is, toon webshop
  if (hostname === 'shop.minous.app') {
    // Laat de webshop routes door
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
