'use client';
import { useEffect, useRef } from 'react';
import { paint } from '../lib/paint';

export default function Garment({ k }) {
  const r = useRef(null);
  useEffect(() => {
    const el = r.current;
    paint(el, k);
    const ro = new ResizeObserver(() => paint(el, k));
    ro.observe(el);
    return () => ro.disconnect();
  }, [k]);
  return (
    <div className="cut">
      <div ref={r} className="garment" />
    </div>
  );
}