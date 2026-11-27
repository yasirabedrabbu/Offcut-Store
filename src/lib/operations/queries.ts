import { getSupabase } from '@/lib/auth/server';

export async function listOrders(storeId: string) {
  const { data } = await (await getSupabase()).from('orders').select('*').eq('store_id', storeId).order('created_at', { ascending: false }).limit(50);
  return data || [];
}

export async function listDiscounts(storeId: string) {
  const { data } = await (await getSupabase()).from('discounts').select('*').eq('store_id', storeId).order('created_at', { ascending: false });
  return data || [];
}

export async function listCustomers() {
  const { data } = await (await getSupabase()).from('profiles').select('id, full_name, phone, role, created_at').eq('role', 'customer').order('created_at', { ascending: false });
  return data || [];
}
