'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { bySlug } from './products';

const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem('offcut-cart') || '[]')); } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem('offcut-cart', JSON.stringify(lines)); } catch {}
  }, [lines]);

  const add = (slug, size) =>
    setLines((l) => {
      const i = l.findIndex((x) => x.slug === slug && x.size === size);
      if (i < 0) return [...l, { slug, size, qty: 1 }];
      return l.map((x, j) => (j === i ? { ...x, qty: x.qty + 1 } : x));
    });
  const setQty = (i, qty) =>
    setLines((l) => (qty < 1 ? l.filter((_, j) => j !== i) : l.map((x, j) => (j === i ? { ...x, qty } : x))));

  const count = lines.reduce((n, x) => n + x.qty, 0);
  const total = lines.reduce((n, x) => n + x.qty * (bySlug(x.slug)?.amount || 0), 0);

  return <Ctx.Provider value={{ lines, add, setQty, count, total }}>{children}</Ctx.Provider>;
}