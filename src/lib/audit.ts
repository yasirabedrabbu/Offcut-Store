import { getSupabase, getProfile } from '@/lib/auth/server';

export async function logAudit(action: string, entity: string, entityId: string | null, meta: Record<string, unknown> = {}) {
  const profile = await getProfile();
  if (!profile) return;
  await (await getSupabase()).from('audit_logs').insert({ store_id: profile.store_id, actor_id: profile.id, action, entity, entity_id: entityId, meta });
}
