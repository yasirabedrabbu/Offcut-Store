import { requireRole } from '@/lib/auth/server';
import { listCustomers } from '@/lib/operations/queries';
import { PageHeader } from '@/components/admin/PageHeader';
import { OperationList } from '@/components/admin/OperationList';

export default async function CustomersPage() {
  const profile = await requireRole(['owner', 'admin', 'support']); if (!profile) return null;
  const rows = await listCustomers();
  return <main className="admin-page"><PageHeader title="Customers" description="Customer profiles and contact details." /><OperationList rows={rows} fields={['full_name', 'phone', 'created_at']} /></main>;
}
