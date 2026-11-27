import Link from 'next/link';

export function StoreFooter() {
  return <footer className="store-footer"><div><p className="footer-kicker">Our social media</p><p>Instagram · Facebook · Pinterest</p></div><div className="footer-links"><Link href="/shop">Shop</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/track">Track order</Link></div><strong>Offcut</strong><small>© 2026 Offcut Store. All rights reserved.</small></footer>;
}
