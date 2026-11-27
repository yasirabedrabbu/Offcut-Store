'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function FilterBar() {
  const router = useRouter(); const params = useSearchParams();
  function update(value: string) {
    const next = new URLSearchParams(params.toString());
    value ? next.set('q', value) : next.delete('q');
    router.push(`/shop?${next.toString()}`);
  }
  return <div className="store-filter"><label><span className="sr-only">Search products</span><input defaultValue={params.get('q') || ''} placeholder="Search products" onChange={(event) => update(event.target.value)} /></label><select defaultValue={params.get('sort') || 'new'} onChange={(event) => { const next = new URLSearchParams(params.toString()); next.set('sort', event.target.value); router.push(`/shop?${next}`); }} aria-label="Sort products"><option value="new">New arrivals</option><option value="price">Price low to high</option><option value="name">Name</option></select></div>;
}
