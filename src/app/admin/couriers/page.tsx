import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default function CouriersPage() {
  return <main className="admin-page"><PageHeader title="Couriers" description="Connect delivery providers securely." /><EmptyState title="No courier connected">Courier credentials are stored server side.</EmptyState></main>;
}
