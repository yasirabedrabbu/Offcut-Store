'use server';

import { getProfile, getSupabase } from '@/lib/auth/server';
import { hasPermission } from '@/config/permissions';
import { failure, type ActionResult } from '@/lib/auth/result';
import { logAudit } from '@/lib/audit';
import { pageSchema, settingsSchema } from './schemas';

export async function savePage(values: unknown): Promise<ActionResult> {
  const profile = await getProfile(); const parsed = pageSchema.safeParse(values);
  if (!profile || !hasPermission(profile.role, 'pages:write')) return failure('Not allowed.');
  if (!parsed.success) return failure('Page content is invalid.');
  const { error } = await (await getSupabase()).from('pages').upsert({ ...parsed.data, store_id: profile.store_id });
  if (error) return failure('Could not save page.');
  await logAudit('update', 'page', parsed.data.slug);
  return { ok: true, data: undefined };
}

export async function saveSettings(values: unknown): Promise<ActionResult> {
  const profile = await getProfile(); const parsed = settingsSchema.safeParse(values);
  if (!profile || !hasPermission(profile.role, 'settings:write')) return failure('Not allowed.');
  if (!parsed.success) return failure('Settings are invalid.');
  const { error } = await (await getSupabase()).from('settings').upsert({ store_id: profile.store_id, values: parsed.data, updated_at: new Date().toISOString() });
  if (error) return failure('Could not save settings.');
  await logAudit('update', 'settings', profile.store_id);
  return { ok: true, data: undefined };
}
