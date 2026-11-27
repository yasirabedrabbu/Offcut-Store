'use client';

import { useState } from 'react';
import { saveProduct } from '@/lib/catalog/actions';

export function ProductForm() {
  const [message, setMessage] = useState('');
  async function submit(form: FormData) {
    const result = await saveProduct({ name: String(form.get('name')), slug: String(form.get('slug')), description: String(form.get('description') || ''), published: form.get('published') === 'on', variants: [{ sku: String(form.get('sku')), size: String(form.get('size')), color: String(form.get('color') || ''), pricePoisha: Number(form.get('price')), stock: Number(form.get('stock')) }] });
    setMessage(result.ok ? 'Product saved.' : result.error);
  }
  return <form className="admin-form" action={submit}><label>Name<input name="name" required /></label><label>Slug<input name="slug" pattern="[a-z0-9-]+" required /></label><label>Description<textarea name="description" /></label><label>SKU<input name="sku" required /></label><label>Size<input name="size" required /></label><label>Price in poisha<input name="price" type="number" min="0" required /></label><label>Stock<input name="stock" type="number" min="0" required /></label><label><input name="published" type="checkbox" /> Publish</label><button>Save product</button>{message && <p role="status">{message}</p>}</form>;
}
