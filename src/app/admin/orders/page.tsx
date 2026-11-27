import { requireRole } from '@/lib/auth/server';
import { listOrders } from '@/lib/operations/queries';
import { PageHeader } from '@/components/admin/PageHeader';
import { OperationList } from '@/components/admin/OperationList';

export default async function OrdersPage() {
  const profile = await requireRole(['owner', 'admin', 'packer', 'support']); if (!profile) return null;
  const rows = await listOrders(profile.store_id);
  return <main className="admin-page"><PageHeader title="Orders" description="Review and process customer orders." /><OperationList rows={rows} fields={['id', 'customer_name', 'phone', 'status', 'total_poisha']} /></main>;
}
