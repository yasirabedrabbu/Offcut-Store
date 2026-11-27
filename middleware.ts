import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: { getAll: () => request.cookies.getAll(), setAll: (values) => values.forEach(({ name, value, options }) => { request.cookies.set(name, value); response.cookies.set(name, value, options); }) },
  });
  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;
  if ((path.startsWith('/account') || path.startsWith('/admin')) && !user) {
    const login = path.startsWith('/admin') ? '/admin/login' : '/login';
    const url = new URL(login, request.url);
    url.searchParams.set('returnTo', path);
    return NextResponse.redirect(url);
  }
  return response;
}

export const config = { matcher: ['/account/:path*', '/admin/:path*'] };
