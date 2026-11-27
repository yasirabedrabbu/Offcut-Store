import Link from 'next/link';
import Garment from '../../components/Garment';
import { ITEMS } from '../../lib/products';
import { FilterBar } from '../../src/components/store/FilterBar';
import { ProductCard } from '../../src/components/store/ProductCard';

export const metadata = { title: 'Shop | Offcut' };

export default function Shop({ searchParams }) {
  const query = String(searchParams?.q || '').toLowerCase();
  const sort = String(searchParams?.sort || 'new');
  const items = ITEMS.filter((item) => item.name.toLowerCase().includes(query)).sort((a, b) => sort === 'price' ? a.amount - b.amount : sort === 'name' ? a.name.localeCompare(b.name) : a.k - b.k);
  return (
    <section className="wrap">
      <h1 className="h1">Shop</h1>
      <p className="sub">Limited run. No restocks.</p>
      <FilterBar />
      <div className="grid">
        {items.map((i) => (
          <ProductCard key={i.slug} slug={i.slug} name={i.name} amount={i.amount} />
        ))}
      </div>
    </section>
  );
}
