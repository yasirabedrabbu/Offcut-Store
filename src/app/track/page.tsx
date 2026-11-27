'use client';

import { useState } from 'react';

export default function TrackPage() {
  const [message, setMessage] = useState('');
  async function submit(form: FormData) {
    const response = await fetch(`/api/track?order=${encodeURIComponent(String(form.get('order')))}&phone=${encodeURIComponent(String(form.get('phone')))}`);
    const data = await response.json(); setMessage(response.ok ? `Status: ${data.status}` : data.error);
  }
  return <main className="wrap"><h1 className="h1">Track order</h1><form className="checkout-form" action={submit}><label>Order ID<input name="order" required /></label><label>Phone<input name="phone" required /></label><button>Track order</button>{message && <p role="status">{message}</p>}</form></main>;
}
