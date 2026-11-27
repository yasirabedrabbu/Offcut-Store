import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Role } from '@/lib/db/types';
import { hasPermission, type Permission } from '@/config/permissions';

export async function getSupabase() {
  const jar = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: { getAll: () => jar.getAll(), setAll: (values) => values.forEach(({ name, value, options }) => jar.set(name, value, options)) },
  });
}

export async function getSession() {
  const supabase = await getSupabase();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getProfile() {
  const session = await getSession();
  if (!session) return null;
  const supabase = await getSupabase();
  const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
  return data as { id: string; store_id: string; full_name: string; phone: string; role: Role } | null;
}

export async function requireRole(roles: Role[]) {
  const profile = await getProfile();
  if (!profile || !roles.includes(profile.role)) return null;
  return profile;
}

export async function can(permission: Permission) {
  const profile = await getProfile();
  return Boolean(profile && hasPermission(profile.role, permission));
}
