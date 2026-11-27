import Link from 'next/link';

export function Topbar({ name }: { name: string }) {
  return <header className="admin-topbar"><label><span className="sr-only">Search admin</span><input placeholder="Search  Ctrl K" /></label><span>{name}</span><Link href="/">Storefront</Link><Link href="/login">Sign out</Link></header>;
}
