import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabase } from '@/lib/auth/server';

const schema = z.object({ name: z.string().min(1).max(80), value: z.record(z.string(), z.unknown()).default({}) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid event.' }, { status: 400 });
  const { error } = await (await getSupabase()).from('analytics_events').insert({ name: parsed.data.name, value: parsed.data.value });
  return error ? NextResponse.json({ error: 'Could not record event.' }, { status: 500 }) : NextResponse.json({ ok: true });
}
