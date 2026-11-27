'use server';

import { getProfile, getSupabase } from '@/lib/auth/server';
import { hasPermission } from '@/config/permissions';
import { failure, type ActionResult } from '@/lib/auth/result';
import { logAudit } from '@/lib/audit';
import { sectionsSchema, themeSchema } from './schemas';

export async function saveTheme(values: unknown): Promise<ActionResult> {
  const profile = await getProfile(); const parsed = themeSchema.safeParse(values);
  if (!profile || !hasPermission(profile.role, 'appearance:write')) return failure('Not allowed.');
  if (!parsed.success) return failure('Theme values are invalid.');
  const { error } = await (await getSupabase()).from('theme_config').upsert({ store_id: profile.store_id, config: parsed.data, updated_at: new Date().toISOString() });
  if (error) return failure('Could not save theme.');
  await logAudit('update', 'theme_config', profile.store_id, parsed.data);
  return { ok: true, data: undefined };
}

export async function saveSections(values: unknown): Promise<ActionResult> {
  const profile = await getProfile(); const parsed = sectionsSchema.safeParse(values);
  if (!profile || !hasPermission(profile.role, 'appearance:write')) return failure('Not allowed.');
  if (!parsed.success) return failure('Section order is invalid.');
  const db = await getSupabase(); await db.from('home_sections').delete().eq('store_id', profile.store_id);
  const { error } = await db.from('home_sections').insert(parsed.data.map((section) => ({ ...section, store_id: profile.store_id, section_key: section.sectionKey })));
  if (error) return failure('Could not save sections.');
  await logAudit('update', 'home_sections', profile.store_id);
  return { ok: true, data: undefined };
}
