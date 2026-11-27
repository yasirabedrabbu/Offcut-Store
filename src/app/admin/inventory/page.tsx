import { requireRole } from '@/lib/auth/server';
import { listLowStock } from '@/lib/catalog/queries';
import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default async function InventoryPage() {
  const profile = await requireRole(['owner', 'admin', 'packer']);
  if (!profile) return null;
  const variants = await listLowStock(profile.store_id);
  return <main className="admin-page"><PageHeader title="Inventory" description="Monitor variants that need attention." />{variants.length ? <div className="admin-list">{variants.map((variant) => <article key={variant.id}><strong>{variant.products?.name || variant.sku}</strong><span>{variant.size} · {variant.stock} left</span></article>)}</div> : <EmptyState title="Inventory is healthy">No low stock variants.</EmptyState>}</main>;
}
