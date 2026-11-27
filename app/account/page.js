import Link from 'next/link';
import '@/styles/base.css';

export default function AccountPage() {
  return <main className="wrap"><h1 className="h1">Account</h1><p className="sub">Sign in to view your orders and profile.</p><Link className="btn ui" href="/login">Sign in</Link></main>;
}
