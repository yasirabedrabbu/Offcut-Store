import '@/styles/base.css';
import '@/styles/auth.css';
import Link from 'next/link';
import { AuthForm } from '../../src/components/auth/AuthForm';

export default function RegisterPage() {
  return <main className="auth-page"><section className="auth-brand"><h1>Offcut Store</h1><p>Join the next limited run.</p></section><section className="auth-form"><h2>Create account</h2><AuthForm register /><Link href="/login">Already have an account?</Link></section></main>;
}
