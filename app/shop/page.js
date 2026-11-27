import Link from 'next/link';
import Garment from '../../components/Garment';
import { ITEMS } from '../../lib/products';

export const metadata = { title: 'Shop | Offcut' };

export default function Shop() {
  return (
    <section className="wrap">
      <h1 className="h1">Shop</h1>
      <p className="sub">Limited run. No restocks.</p>
      <div className="grid">
        {ITEMS.map((i) => (
          <Link key={i.slug} href={`/shop/${i.slug}`} className="card">
            <div className="shot"><Garment k={i.k} /></div>
            <div className="meta ui"><span>{i.name}</span><span>{i.price}</span></div>
          </Link>
        ))}
      </div>
    </section>
  );
}