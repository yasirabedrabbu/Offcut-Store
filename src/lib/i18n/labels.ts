export const LABELS = {
  en: { shop: 'Shop', cart: 'Cart', add: 'Add to cart', empty: 'Your cart is empty.' },
  bn: { shop: 'শপ', cart: 'কার্ট', add: 'কার্টে যোগ করুন', empty: 'আপনার কার্ট খালি।' },
} as const;

export type Locale = keyof typeof LABELS;
