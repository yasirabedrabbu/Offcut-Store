import { requireRole } from '@/lib/auth/server';
import { listProducts } from '@/lib/catalog/queries';
import { PageHeader } from '@/components/admin/PageHeader';
import { ProductForm } from '@/components/admin/ProductForm';
import { EmptyState } from '@/components/ui/EmptyState';

export default async function ProductsPage() {
  const profile = await requireRole(['owner', 'admin']);
  if (!profile) return null;
  const products = await listProducts(profile.store_id);
  return <main className="admin-page"><PageHeader title="Products" description="Create and publish products with variants." /><ProductForm />{products.length ? <div className="admin-list">{products.map((product) => <article key={product.id}><strong>{product.name}</strong><span>{product.published ? 'Published' : 'Draft'}</span></article>)}</div> : <EmptyState title="No products yet">Create your first product above.</EmptyState>}</main>;
}
