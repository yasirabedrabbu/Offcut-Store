import Link from 'next/link';
import { signOut } from '@/lib/auth/actions';

export function Topbar({ name }: { name: string }) {
  return <header className="admin-topbar"><label><span className="sr-only">Search admin</span><input placeholder="Search  Ctrl K" /></label><span>{name}</span><Link href="/">Storefront</Link><form action={signOut}><button type="submit">Sign out</button></form></header>;
}
