import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/auth/server';

export async function GET(request: Request) {
  const url = new URL(request.url); const order = url.searchParams.get('order'); const phone = url.searchParams.get('phone');
  if (!order || !phone) return NextResponse.json({ error: 'Order ID and phone are required.' }, { status: 400 });
  const { data, error } = await (await getSupabase()).from('orders').select('status').eq('id', order).eq('phone', phone).maybeSingle();
  if (error || !data) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
  return NextResponse.json(data);
}
