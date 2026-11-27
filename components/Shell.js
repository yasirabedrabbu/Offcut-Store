'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../lib/cart';

export default function Shell({ children }) {
  const path = usePathname();
  const { count } = useCart();
  if (path === '/') return children;
  return (
    <>
      <header className="nav">
        <Link href="/" className="logo">Offcut</Link>
        <nav className="ui">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart">Cart ({count})</Link>
        </nav>
      </header>
      <main className="page">{children}</main>
      <footer className="foot ui">
        <span>Offcut</span>
        <span>Limited run. No restocks.</span>
      </footer>
    </>
  );
}