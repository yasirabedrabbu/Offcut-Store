'use server';

import { checkoutSchema, type CheckoutInput } from './schemas';
import { getProfile, getSupabase } from '@/lib/auth/server';
import { failure, type ActionResult } from '@/lib/auth/result';
import { logAudit } from '@/lib/audit';

export async function placeOrder(values: CheckoutInput): Promise<ActionResult<{ id: string }>> {
  const parsed = checkoutSchema.safeParse(values);
  if (!parsed.success) return failure('Check your delivery details.', parsed.error.flatten().fieldErrors);
  const profile = await getProfile(); const db = await getSupabase();
  const { data, error } = await db.rpc('place_order', { input: parsed.data, customer_id: profile?.id || null });
  if (error || !data) return failure('Some items are unavailable. Please refresh your cart.');
  await logAudit('create', 'order', data.id, { payment: parsed.data.paymentMethod });
  return { ok: true, data: { id: data.id } };
}
