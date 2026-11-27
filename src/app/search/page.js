import Link from 'next/link';
import { ITEMS } from '../../lib/products';

export default function SearchPage({ searchParams }) {
  const query = String(searchParams?.q || '').toLowerCase();
  const results = ITEMS.filter((item) => item.name.toLowerCase().includes(query));
  return <section className="wrap"><h1 className="h1">Search</h1><p className="sub">{query ? `${results.length} results for ${query}` : 'Find your next piece.'}</p><div className="grid">{results.map((item) => <Link className="card" key={item.slug} href={`/shop/${item.slug}`}><div className="shot"><div className="garment-placeholder">{item.name}</div></div><div className="meta ui"><span>{item.name}</span><span>{item.price}</span></div></Link>)}</div></section>;
}
