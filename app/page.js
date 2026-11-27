import Link from 'next/link';
import { ITEMS } from '../lib/products';
import { StoreHeader } from '../src/components/store/StoreHeader';
import { StoreFooter } from '../src/components/store/StoreFooter';

const categories = ['Clothes', 'Shoes', 'Bags', 'Accessories'];
const looks = ['Everyday uniform', 'After hours', 'Built for movement'];

export default function Home() {
  return <><StoreHeader /><main className="editorial-home">
    <section className="editorial-hero">
      <div className="hero-copy"><p className="eyebrow">Offcut / Limited run</p><h1>Made from what remains.</h1><p>Considered pieces for everyday movement. Small batches, no restocks.</p><Link className="editorial-button" href="/shop">Shop the collection</Link></div>
      <div className="hero-panels"><div className="image-block hero-block-one"><span>New forms</span></div><div className="image-block hero-block-two"><span>Offcut uniform</span></div></div>
    </section>
    <EditorialRail />
    <section className="editorial-section"><SectionHeading title="Categories" /><div className="category-list">{categories.map((category) => <Link key={category} href="/shop"><span>{category} /</span><b>→</b></Link>)}</div></section>
    <section className="editorial-section"><SectionHeading title="Looks gallery" /><div className="look-grid">{looks.map((look, index) => <article className={`look-card look-${index}`} key={look}><div className="image-block"><span>{look}</span></div><p>Layered pieces, ready for the day.</p></article>)}</div></section>
    <section className="feature-band"><h2>New styles for a modern look.</h2><Link href="/shop">Explore all pieces →</Link></section>
    <section className="editorial-section voices"><SectionHeading title="Happy voices" /><p>Real clothes for real days, made in limited quantities and designed to last.</p></section>
    <Newsletter />
  </main><StoreFooter /></>;
}

function SectionHeading({ title }) { return <div className="section-heading"><h2>{title}</h2><Link href="/shop">Shop now →</Link></div>; }
function EditorialRail() { return <section className="editorial-section"><SectionHeading title="Ready to wear" /><div className="product-rail">{ITEMS.slice(0, 3).map((item) => <Link href={`/shop/${item.slug}`} key={item.slug}><div className="image-block product-block"><span>{item.name}</span></div><p>{item.name}</p><small>{item.price}</small></Link>)}</div></section>; }
function Newsletter() { return <section className="newsletter"><h2>Subscribe to our newsletter</h2><p>New drops and thoughtful updates, occasionally.</p><form><input aria-label="Email address" type="email" placeholder="Your email" /><button>Subscribe</button></form></section>; }
