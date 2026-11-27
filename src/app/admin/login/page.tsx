import Link from 'next/link';
import '@/styles/base.css';
import '@/styles/auth.css';

export default function AdminLogin() {
  return <main className="auth-page"><section className="auth-brand"><h1>Offcut Store</h1><p>Run your clothing brand with clarity.</p></section><section className="auth-form"><h2>Admin login</h2><p>Sign in with a staff account to continue.</p><Link href="/login">Use storefront login</Link></section></main>;
}
