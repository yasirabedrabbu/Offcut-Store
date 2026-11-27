import '@/styles/base.css';
import '@/styles/store.css';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  return <main className="wrap"><h1 className="h1">Checkout</h1><p className="sub">Delivery details for Bangladesh.</p><CheckoutForm /></main>;
}
