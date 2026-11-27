'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '../lib/data';
import { ITEMS } from '../lib/products';
import { paint } from '../lib/paint';

const N = 10, SLOT = 108, OPEN = 86, CX = 750;
const EASE = 'cubic-bezier(.2,.8,.2,1)';
const pad2 = (n) => String(n).padStart(2, '0');

export default function Page() {
  const router = useRouter();
  const art = useRef(null), big = useRef(null), big2 = useRef(null), iRefs = useRef([]);
  const S = useRef({ hov: -1, open: -1, shown: false, hidden: -1, capK: 0 });
  const [, force] = useState(0);
  const upd = () => force((x) => x + 1);
  const st = S.current;
  if (st.hov >= 0) st.capK = st.hov;

  const baseX = (k) => CX + (k - (N - 1) / 2) * SLOT;
  const xOf = (k) =>
    st.hov >= 0 && k !== st.hov ? baseX(k) + Math.sign(k - st.hov) * OPEN : baseX(k);

  const anim = (el, kf, opt) => el.animate(kf, { easing: EASE, ...opt });
  const cancelAll = (el) => el.getAnimations().forEach((a) => a.cancel());

  const openG = (k) => {
    if (st.open >= 0) return;
    st.open = k; st.hov = k;
    const gx = baseX(k);
    cancelAll(big.current); paint(big.current, k);
    st.shown = true; st.hidden = k; upd();
    anim(big.current, [
      { transform: `translate(${gx - 750}px, -8px) scale(.61)`, opacity: 1 },
      { transform: 'none', opacity: 1 },
    ], { duration: 750, fill: 'forwards' });
  };

  const step = (d) => {
    if (st.open < 0) return;
    const from = st.open;
    st.open = (st.open + d + N) % N;
    st.hidden = st.open; st.hov = st.open; upd();
    paint(big2.current, from);
    anim(big2.current, [
      { transform: 'none', opacity: 1, filter: 'blur(0)' },
      { transform: `translateX(${-d * 120}px) scale(.94)`, opacity: 0, filter: 'blur(6px)' },
    ], { duration: 600 });
    cancelAll(big.current); paint(big.current, st.open);
    anim(big.current, [
      { transform: `translateX(${d * 120}px) scale(.94)`, opacity: 0, filter: 'blur(6px)' },
      { transform: 'none', opacity: 1, filter: 'blur(0)' },
    ], { duration: 600, fill: 'forwards' });
  };

  const closeG = () => {
    if (st.open < 0) return;
    const gx = baseX(st.open);
    anim(big.current, [
      { transform: 'none', opacity: 1 },
      { transform: `translate(${gx - 750}px, -8px) scale(.61)`, opacity: 1 },
    ], { duration: 650, fill: 'forwards' });
    st.shown = false; upd();
    setTimeout(() => {
      st.hidden = -1;
      cancelAll(big.current);
      big.current.style.opacity = 0;
      st.open = -1; st.hov = -1; upd();
    }, 650);
  };

  useEffect(() => {
    document.body.classList.add('hero');
    iRefs.current.forEach((el, k) => paint(el, k));
    const fit = () => {
      const k = Math.min(innerWidth / 1500, innerHeight / 1000);
      const a = art.current.style;
      a.transform = `scale(${k})`;
      a.left = (innerWidth - 1500 * k) / 2 + 'px';
      a.top = (innerHeight - 1000 * k) / 2 + 'px';
    };
    fit();
    const key = (e) => {
      if (st.open < 0) {
        if (e.key === 'ArrowRight') { st.hov = Math.min(N - 1, st.hov + 1); upd(); }
        else if (e.key === 'ArrowLeft') { st.hov = st.hov < 0 ? N - 1 : Math.max(0, st.hov - 1); upd(); }
        else if (e.key === 'Enter' && st.hov >= 0) openG(st.hov);
      } else {
        if (e.key === 'ArrowRight') step(1);
        else if (e.key === 'ArrowLeft') step(-1);
        else if (e.key === 'Escape') closeG();
      }
    };
    addEventListener('resize', fit);
    addEventListener('keydown', key);
    window.__closet = { openG, step, closeG, setHov: (k) => { st.hov = k; upd(); } };
    return () => {
      removeEventListener('resize', fit);
      removeEventListener('keydown', key);
      document.body.classList.remove('hero', 'open');
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.body.classList.toggle('open', st.shown);
  });

  const info = PRODUCTS[st.open >= 0 ? st.open : 0];
  const chev = (d) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={d} />
    </svg>
  );
  const items = [];
  for (let r = 0; r < 16; r++)
    ['OFFCUT', '•', 'LIMITED RUN', '•', 'NO RESTOCKS', '•'].forEach((t, j) =>
      items.push(<span key={r * 6 + j}>{t}</span>)
    );

  return (
    <div id="art" ref={art}>
      <div id="logo" className="dim">Offcut</div>
      <div id="rail" className="dim" />

      <div id="rack" className="dim"
        onPointerLeave={() => { if (st.open < 0) { st.hov = -1; upd(); } }}>
        {PRODUCTS.map((_, k) => (
          <div key={k}
            className={'g' + (k === st.hov ? ' face' : '')}
            style={{ left: xOf(k) + 'px', visibility: st.hidden === k ? 'hidden' : undefined }}
            onPointerEnter={() => { if (st.open < 0) { st.hov = k; upd(); } }}
            onClick={() => openG(k)}>
            <i ref={(el) => (iRefs.current[k] = el)} />
          </div>
        ))}
      </div>

      <Link id="about" href="/about" className="ui dim">About</Link>
      <Link id="contact" href="/contact" className="ui dim dimmer">Contact</Link>

      <div id="cap" className={'dimmer' + (st.hov >= 0 ? ' on' : '')}
        style={{ left: xOf(st.capK) + 'px' }}>
        <b>{PRODUCTS[st.capK][0]}</b>
        <span>{PRODUCTS[st.capK][1]}</span>
      </div>

      <button id="avail" className="pill ui dim dimmer" onClick={() => router.push('/shop')}>
        See availability
      </button>

      <div id="band" className="dimmer"><div>{items}</div></div>

      <div id="det">
        <div className="hit" onClick={closeG} />
        <div id="big2" ref={big2} />
        <div id="big" ref={big} />
        <button id="prev" className="arr" aria-label="Previous" onClick={() => step(-1)}>
          {chev('M15 5L8 12L15 19')}
        </button>
        <button id="next" className="arr" aria-label="Next" onClick={() => step(1)}>
          {chev('M9 5L16 12L9 19')}
        </button>
        <div id="info">
          <div id="num">{pad2((st.open >= 0 ? st.open : 0) + 1)} / {pad2(N)}</div>
          <div id="name">{info[0]}</div>
          <div id="price">{info[1]}</div>
          <button className="pill ui"
            onClick={() => router.push('/shop/' + ITEMS[st.open >= 0 ? st.open : 0].slug)}>
            See availability
          </button>
        </div>
        <button id="close" className="ui" onClick={closeG}>Close</button>
      </div>
    </div>
  );
}