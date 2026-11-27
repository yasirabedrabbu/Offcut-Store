'use client';
import { useState } from 'react';
import Link from 'next/link';
import Garment from './Garment';
import { useCart } from '../lib/cart';
import { bySlug } from '../lib/products';

export default function ProductView({ slug }) {
  const item = bySlug(slug);
  const { add } = useCart();
  const [size, setSize] = useState('');
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    if (!size) return;
    add(slug, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="wrap">
      <div className="pv">
        <div className="shot"><Garment k={item.k} /></div>
        <div>
          <div className="ui" style={{ color: 'var(--mute)' }}>
            <Link href="/shop">Shop</Link> / {String(item.k + 1).padStart(2, '0')}
          </div>
          <h1 className="h1" style={{ marginTop: 12 }}>{item.name}</h1>
          <div className="price">{item.price}</div>
          <p className="desc">{item.desc}</p>
          <div className="ui">Size</div>
          <div className="sizes">
            {item.sizes.map((s) => (
              <button key={s} className={'size ui' + (size === s ? ' on' : '')} onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>
          <button className="btn ui" disabled={!size} onClick={onAdd}>
            {added ? 'Added' : size ? 'Add to cart' : 'Select a size'}
          </button>
          {added && (
            <Link href="/cart" className="ui" style={{ marginLeft: 20, color: 'var(--mute)' }}>View cart</Link>
          )}
        </div>
      </div>
    </section>
  );
}