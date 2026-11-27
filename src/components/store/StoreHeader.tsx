'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../../../lib/cart';

export function StoreHeader() {
  const path = usePathname(); const { count } = useCart();
  return <header className="store-header">
    <button className="store-menu" aria-label="Open menu">Menu</button>
    <nav className="store-nav store-nav-left" aria-label="Primary navigation"><Link href="/shop">Categories</Link><Link href="/shop">New product</Link><Link href="/search">Search</Link></nav>
    <Link className="store-logo" href="/">Offcut</Link>
    <nav className="store-nav store-nav-right" aria-label="Utility navigation"><Link href="/about">About</Link><Link href="/about">FAQ</Link><Link href="/account">Account</Link><Link className={path === '/cart' ? 'active' : ''} href="/cart">Cart ({count})</Link></nav>
  </header>;
}
