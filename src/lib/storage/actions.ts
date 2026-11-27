'use server';

import { z } from 'zod';
import { getProfile, getSupabase } from '@/lib/auth/server';
import { hasPermission } from '@/config/permissions';
import { logAudit } from '@/lib/audit';
import { failure, type ActionResult } from '@/lib/auth/result';

const mediaInput = z.object({ id: z.string().uuid(), alt: z.string().trim().min(1), folder: z.string().min(1) });

export async function updateMedia(values: unknown): Promise<ActionResult> {
  const profile = await getProfile(); const parsed = mediaInput.safeParse(values);
  if (!profile || !hasPermission(profile.role, 'media:write')) return failure('Not allowed.');
  if (!parsed.success) return failure('Alt text is required.');
  const { error } = await (await getSupabase()).from('media').update({ alt: parsed.data.alt, folder: parsed.data.folder }).eq('id', parsed.data.id).eq('store_id', profile.store_id);
  if (error) return failure('Could not update media.');
  await logAudit('update', 'media', parsed.data.id, { folder: parsed.data.folder });
  return { ok: true, data: undefined };
}

export async function deleteMedia(id: string): Promise<ActionResult> {
  const profile = await getProfile();
  if (!profile || !hasPermission(profile.role, 'media:delete')) return failure('Not allowed.');
  const { data, error } = await (await getSupabase()).from('media').delete().eq('id', id).eq('store_id', profile.store_id);
  if (error || !data) return failure('Could not delete media.');
  await logAudit('delete', 'media', id);
  return { ok: true, data: undefined };
}
