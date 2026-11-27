export type Role = 'owner' | 'admin' | 'packer' | 'support' | 'customer';
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Product {
  id: string;
  name: string;
  slug: string;
  pricePoisha: number;
  published: boolean;
}

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
}
