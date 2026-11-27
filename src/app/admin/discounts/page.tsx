import { requireRole } from '@/lib/auth/server';
import { listDiscounts } from '@/lib/operations/queries';
import { PageHeader } from '@/components/admin/PageHeader';
import { OperationList } from '@/components/admin/OperationList';

export default async function DiscountsPage() {
  const profile = await requireRole(['owner', 'admin']); if (!profile) return null;
  const rows = await listDiscounts(profile.store_id);
  return <main className="admin-page"><PageHeader title="Discounts" description="Manage promotional codes and offers." /><OperationList rows={rows} fields={['code', 'kind', 'value', 'active']} /></main>;
}
