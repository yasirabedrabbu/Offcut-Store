import '@/styles/base.css';
import '@/styles/auth.css';
import Link from 'next/link';
import { AuthForm } from '../../src/components/auth/AuthForm';

export default function LoginPage() {
  return <main className="auth-page"><section className="auth-brand"><h1>Offcut Store</h1><p>Small batches, considered materials.</p></section><section className="auth-form"><h2>Sign in</h2><AuthForm /><Link href="/register">Create an account</Link><Link href="/forgot-password">Forgot password?</Link></section></main>;
}
