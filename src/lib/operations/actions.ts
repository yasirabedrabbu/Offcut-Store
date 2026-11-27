'use server';

import { getProfile, getSupabase } from '@/lib/auth/server';
import { hasPermission } from '@/config/permissions';
import { failure, type ActionResult } from '@/lib/auth/result';
import { logAudit } from '@/lib/audit';
import { discountSchema, statusSchema } from './schemas';

export async function updateOrderStatus(values: unknown): Promise<ActionResult> {
  const profile = await getProfile(); const parsed = statusSchema.safeParse(values);
  if (!profile || !hasPermission(profile.role, 'orders:write')) return failure('Not allowed.');
  if (!parsed.success) return failure('Invalid order status.');
  const db = await getSupabase(); const { error } = await db.from('orders').update({ status: parsed.data.status }).eq('id', parsed.data.id).eq('store_id', profile.store_id);
  if (error) return failure('Could not update order.');
  await db.from('order_events').insert({ order_id: parsed.data.id, status: parsed.data.status, note: 'Updated by staff' });
  await logAudit('update', 'order', parsed.data.id, { status: parsed.data.status });
  return { ok: true, data: undefined };
}

export async function saveDiscount(values: unknown): Promise<ActionResult> {
  const profile = await getProfile(); const parsed = discountSchema.safeParse(values);
  if (!profile || !hasPermission(profile.role, 'discounts:write')) return failure('Not allowed.');
  if (!parsed.success) return failure('Check discount fields.', parsed.error.flatten().fieldErrors);
  const { error } = await (await getSupabase()).from('discounts').insert({ ...parsed.data, store_id: profile.store_id, minimum_poisha: parsed.data.minimumPoisha, expires_at: parsed.data.expiresAt });
  if (error) return failure('Could not save discount.');
  await logAudit('create', 'discount', null, { code: parsed.data.code });
  return { ok: true, data: undefined };
}
