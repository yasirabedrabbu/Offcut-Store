import { notFound } from 'next/navigation';
import ProductView from '../../../components/ProductView';
import { ITEMS, bySlug } from '../../../lib/products';

export function generateStaticParams() {
  return ITEMS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = bySlug(slug);
  return { title: item ? `${item.name} | Offcut` : 'Offcut' };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  if (!bySlug(slug)) notFound();
  return <ProductView slug={slug} />;
}