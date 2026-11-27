import Link from 'next/link';
import '@/styles/base.css';
import '@/styles/admin.css';

export default function AdminLoginPage() {
  return <main className="auth-page"><section className="auth-brand"><h1>Offcut Admin</h1><p>Manage your store, products, and orders.</p></section><section className="auth-form"><h2>Admin access</h2><p>Sign in with a staff account to continue.</p><Link className="button button-solid" href="/login">Continue to sign in</Link></section></main>;
}
