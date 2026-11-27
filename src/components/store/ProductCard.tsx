import Link from 'next/link';
import { formatMoney } from '@/lib/money';

type ProductCardProps = { slug: string; name: string; amount: number; label?: string };

export function ProductCard({ slug, name, amount, label }: ProductCardProps) {
  return <Link className="store-product-card" href={`/shop/${slug}`}><div className="store-placeholder" aria-label={`${name} image placeholder`}><span>{label || 'Offcut'}</span></div><div className="store-product-meta"><strong>{name}</strong><span>{formatMoney(amount * 100)}</span></div></Link>;
}
