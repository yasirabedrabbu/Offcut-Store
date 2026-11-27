import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { uploadSchema } from '@/lib/storage/validation';
import { getProfile, getSupabase } from '@/lib/auth/server';
import { hasPermission } from '@/config/permissions';

export async function POST(request: Request) {
  const profile = await getProfile();
  if (!profile || !hasPermission(profile.role, 'media:write')) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });
  const parsed = uploadSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid upload.', fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  const ext = parsed.data.name.split('.').pop()?.toLowerCase() || 'bin';
  const path = `${profile.store_id}/${parsed.data.folder}/${randomUUID()}.${ext}`;
  const { data, error } = await (await getSupabase()).storage.from('media').createSignedUploadUrl(path);
  if (error) return NextResponse.json({ error: 'Could not prepare upload.' }, { status: 500 });
  return NextResponse.json({ path, token: data.token });
}
