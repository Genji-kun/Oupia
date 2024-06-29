import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('user');

    if (currentUser && (request.nextUrl.pathname === "/sign-up" || request.nextUrl.pathname === "/sign-in")) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!currentUser && (request.nextUrl.pathname.startsWith('/upload') || request.nextUrl.pathname.startsWith('/messages') || request.nextUrl.pathname.startsWith('/settings') || request.nextUrl.pathname.startsWith('/vote'))) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/upload/:path*', '/messages/:path*', '/settings/:path*', '/vote/:path*', '/sign-in', "/sign-up"],
}
