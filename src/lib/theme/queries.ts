import { getSupabase } from '@/lib/auth/server';
import { DEFAULT_THEME } from '@/config/default-theme';

export async function getTheme(storeId: string) {
  const { data } = await (await getSupabase()).from('theme_config').select('config').eq('store_id', storeId).maybeSingle();
  return { ...DEFAULT_THEME, ...(data?.config || {}) };
}

export async function getSections(storeId: string) {
  const { data } = await (await getSupabase()).from('home_sections').select('*').eq('store_id', storeId).order('position');
  return data || [];
}
