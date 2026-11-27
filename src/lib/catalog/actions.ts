'use server';

import { productSchema, type ProductInput } from './schemas';
import { getProfile, getSupabase } from '@/lib/auth/server';
import { hasPermission } from '@/config/permissions';
import { logAudit } from '@/lib/audit';
import { failure, type ActionResult } from '@/lib/auth/result';

export async function saveProduct(values: ProductInput): Promise<ActionResult<{ id: string }>> {
  const profile = await getProfile(); const parsed = productSchema.safeParse(values);
  if (!profile || !hasPermission(profile.role, 'products:write')) return failure('Not allowed.');
  if (!parsed.success) return failure('Check the product fields.', parsed.error.flatten().fieldErrors);
  const db = await getSupabase(); const input = parsed.data;
  const { data: product, error } = await db.from('products').upsert({ id: input.id, store_id: profile.store_id, name: input.name, slug: input.slug, description: input.description, published: input.published }).select('id').single();
  if (error || !product) return failure('Could not save product.');
  await db.from('product_variants').upsert(input.variants.map((variant) => ({ ...variant, product_id: product.id, price_poisha: variant.pricePoisha })));
  await logAudit(input.id ? 'update' : 'create', 'product', product.id, { published: input.published });
  return { ok: true, data: { id: product.id } };
}

export async function adjustStock(id: string, delta: number, reason: string): Promise<ActionResult> {
  const profile = await getProfile();
  if (!profile || !hasPermission(profile.role, 'inventory:write')) return failure('Not allowed.');
  if (!Number.isInteger(delta) || !reason.trim()) return failure('Stock adjustment is invalid.');
  const db = await getSupabase(); const { data: variant } = await db.from('product_variants').select('stock').eq('id', id).single();
  if (!variant || variant.stock + delta < 0) return failure('Stock cannot be negative.');
  await db.from('product_variants').update({ stock: variant.stock + delta }).eq('id', id);
  await db.from('inventory_events').insert({ variant_id: id, store_id: profile.store_id, delta, reason, actor_id: profile.id });
  await logAudit('adjust', 'inventory', id, { delta, reason });
  return { ok: true, data: undefined };
}
