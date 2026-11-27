import { NextResponse } from 'next/server';
import { completeSchema } from '@/lib/storage/validation';
import { getProfile, getSupabase } from '@/lib/auth/server';
import { hasPermission } from '@/config/permissions';
import { logAudit } from '@/lib/audit';

export async function POST(request: Request) {
  const profile = await getProfile();
  if (!profile || !hasPermission(profile.role, 'media:write')) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });
  const parsed = completeSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Alt text is required.' }, { status: 400 });
  const supabase = await getSupabase();
  const { data: object } = await supabase.storage.from('media').list(parsed.data.path.slice(0, parsed.data.path.lastIndexOf('/')));
  if (!object?.length) return NextResponse.json({ error: 'Uploaded file was not found.' }, { status: 404 });
  const { data, error } = await supabase.from('media').insert({ ...parsed.data, store_id: profile.store_id, created_by: profile.id, mime: 'image/*', size: 0 }).select().single();
  if (error) return NextResponse.json({ error: 'Could not save media.' }, { status: 500 });
  await logAudit('create', 'media', data.id, { path: data.path });
  return NextResponse.json({ media: data });
}
