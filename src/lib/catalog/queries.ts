import { getSupabase } from '@/lib/auth/server';

export async function listProducts(storeId: string) {
  const { data } = await (await getSupabase()).from('products').select('*, product_variants(*)').eq('store_id', storeId).order('created_at', { ascending: false });
  return data || [];
}

export async function listCollections(storeId: string) {
  const { data } = await (await getSupabase()).from('collections').select('*').eq('store_id', storeId).order('name');
  return data || [];
}

export async function listLowStock(storeId: string, threshold = 3) {
  const { data } = await (await getSupabase()).from('product_variants').select('*, products!inner(name, store_id)').eq('products.store_id', storeId).lte('stock', threshold).order('stock');
  return data || [];
}
