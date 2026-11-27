'use client';

import { useState } from 'react';
import { placeOrder } from '@/lib/checkout/actions';

export function CheckoutForm() {
  const [message, setMessage] = useState('');
  async function submit(form: FormData) {
    const result = await placeOrder({ name: String(form.get('name')), phone: String(form.get('phone')), district: String(form.get('district')), thana: String(form.get('thana')), area: String(form.get('area')), details: String(form.get('details')), paymentMethod: 'cod', lines: [] });
    setMessage(result.ok ? `Order placed: ${result.data.id}` : result.error);
  }
  return <form className="checkout-form" action={submit}><label>Name<input name="name" required /></label><label>Phone<input name="phone" placeholder="01XXXXXXXXX" required /></label><label>District<input name="district" required /></label><label>Thana<input name="thana" required /></label><label>Area<input name="area" required /></label><label>Full address<textarea name="details" required /></label><p>Cash on delivery available across Bangladesh.</p><button>Place COD order</button>{message && <p role="status">{message}</p>}</form>;
}
