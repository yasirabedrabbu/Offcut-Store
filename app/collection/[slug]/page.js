import { notFound } from 'next/navigation';
import { ITEMS } from '../../../lib/products';
import { ProductCard } from '../../../src/components/store/ProductCard';

const collections = { essentials: 'Essentials', outerwear: 'Outerwear', new: 'New arrivals' };

export function generateStaticParams() {
  return Object.keys(collections).map((slug) => ({ slug }));
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  if (!collections[slug]) notFound();
  const products = slug === 'new' ? ITEMS.slice(0, 4) : ITEMS.filter((item) => slug === 'outerwear' ? /jacket|hoodie/i.test(item.name) : !/jacket|hoodie/i.test(item.name));
  return <section className="wrap"><h1 className="h1">{collections[slug]}</h1><p className="sub">Curated pieces from the current run.</p><div className="grid">{products.map((item) => <ProductCard key={item.slug} slug={item.slug} name={item.name} amount={item.amount} />)}</div></section>;
}
