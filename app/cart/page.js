'use client';
import Link from 'next/link';
import Garment from '../../components/Garment';
import { useCart } from '../../lib/cart';
import { bySlug } from '../../lib/products';

export default function Cart() {
  const { lines, setQty, total } = useCart();

  return (
    <section className="wrap">
      <h1 className="h1">Cart</h1>
      {lines.length === 0 ? (
        <>
          <p className="sub">Your cart is empty.</p>
          <Link href="/shop" className="btn ui">Go to shop</Link>
        </>
      ) : (
        <>
          <p className="sub">{lines.length} item(s)</p>
          {lines.map((l, i) => {
            const it = bySlug(l.slug);
            return (
              <div className="row" key={l.slug + l.size}>
                <div className="shot"><Garment k={it.k} /></div>
                <div>
                  <Link href={`/shop/${it.slug}`}>{it.name}</Link>
                  <div className="ui" style={{ color: 'var(--mute)', marginTop: 6 }}>Size {l.size}</div>
                </div>
                <div className="qty">
                  <button onClick={() => setQty(i, l.qty - 1)}>-</button>
                  <span>{l.qty}</span>
                  <button onClick={() => setQty(i, l.qty + 1)}>+</button>
                </div>
                <div>€{it.amount * l.qty}</div>
              </div>
            );
          })}
          <div className="total"><span className="ui">Total</span><span>€{total}</span></div>
          <div style={{ marginTop: 24 }}>
            <button className="btn ui" onClick={() => alert('Checkout is a demo. Connect Stripe to take payments.')}>
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}