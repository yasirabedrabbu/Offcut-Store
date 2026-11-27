'use client';

import { useState } from 'react';
import { signIn, signUp } from '@/lib/auth/actions';

export function AuthForm({ register = false, admin = false }: { register?: boolean; admin?: boolean }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(form: FormData) {
    setBusy(true); setError('');
    const values = Object.fromEntries(form);
    const result = register ? await signUp(values) : await signIn(values);
    if (!result.ok) setError(result.error);
    else window.location.href = admin ? '/admin' : result.data.redirect;
    setBusy(false);
  }
  return <form className="auth-fields" action={submit}>
    {register && <label>Full name<input name="fullName" required minLength={2} /></label>}
    <label>Email<input name="email" type="email" required /></label>
    <label>Password<input name="password" type="password" required minLength={8} /></label>
    {error && <p role="alert">{error}</p>}
    <button disabled={busy}>{busy ? 'Loading...' : register ? 'Create account' : 'Sign in'}</button>
  </form>;
}
