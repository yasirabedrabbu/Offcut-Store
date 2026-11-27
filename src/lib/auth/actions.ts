'use server';

import { z } from 'zod';
import { getSupabase } from './server';
import { failure, type ActionResult } from './result';

const credentials = z.object({ email: z.string().email(), password: z.string().min(8) });

export async function signIn(values: unknown): Promise<ActionResult<{ redirect: string }>> {
  const parsed = credentials.safeParse(values);
  if (!parsed.success) return failure('Check the highlighted fields.', parsed.error.flatten().fieldErrors);
  const { error } = await (await getSupabase()).auth.signInWithPassword(parsed.data);
  if (error) return failure('Email or password is incorrect.');
  return { ok: true, data: { redirect: '/account' } };
}

export async function signOut(): Promise<ActionResult> {
  const { error } = await (await getSupabase()).auth.signOut();
  return error ? failure('Could not sign out.') : { ok: true, data: undefined };
}

export async function signUp(values: unknown): Promise<ActionResult<{ redirect: string }>> {
  const parsed = credentials.extend({ fullName: z.string().min(2) }).safeParse(values);
  if (!parsed.success) return failure('Check the highlighted fields.', parsed.error.flatten().fieldErrors);
  const { error } = await (await getSupabase()).auth.signUp({ email: parsed.data.email, password: parsed.data.password, options: { data: { full_name: parsed.data.fullName } } });
  if (error) return failure('Could not create the account.');
  return { ok: true, data: { redirect: '/account' } };
}
