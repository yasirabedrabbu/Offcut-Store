import { requireRole } from '@/lib/auth/server';
import { listCollections } from '@/lib/catalog/queries';
import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default async function CollectionsPage() {
  const profile = await requireRole(['owner', 'admin']);
  if (!profile) return null;
  const collections = await listCollections(profile.store_id);
  return <main className="admin-page"><PageHeader title="Collections" description="Group products into storefront collections." />{collections.length ? <div className="admin-list">{collections.map((collection) => <article key={collection.id}><strong>{collection.name}</strong><span>{collection.published ? 'Published' : 'Draft'}</span></article>)}</div> : <EmptyState title="No collections yet">Collections will appear here.</EmptyState>}</main>;
}
