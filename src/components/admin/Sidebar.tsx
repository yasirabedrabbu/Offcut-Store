import Link from 'next/link';
import { ADMIN_AREAS, hasPermission } from '@/config/permissions';
import type { Role } from '@/lib/db/types';

const labels: Record<(typeof ADMIN_AREAS)[number], string> = {
  overview: 'Overview', orders: 'Orders', products: 'Products', inventory: 'Inventory', customers: 'Customers', discounts: 'Discounts', analytics: 'Analytics',
  pages: 'Pages', journal: 'Journal', navigation: 'Navigation', appearance: 'Appearance', media: 'Media', shipping: 'Shipping', payments: 'Payments', couriers: 'Couriers', fraud: 'Fraud', reviews: 'Reviews', settings: 'Settings', team: 'Team', help: 'Help',
};

export function Sidebar({ role }: { role: Role }) {
  return <aside className="admin-sidebar"><div className="store-chip">Offcut Store</div><nav aria-label="Admin navigation">{ADMIN_AREAS.filter((area) => hasPermission(role, `${area}:read`)).map((area) => <Link key={area} href={`/admin/${area}`}>{labels[area]}</Link>)}</nav></aside>;
}
