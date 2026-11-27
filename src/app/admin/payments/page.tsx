import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default function PaymentsPage() {
  return <main className="admin-page"><PageHeader title="Payments" description="Enable COD and payment providers." /><EmptyState title="Cash on delivery is available">Online payment adapters can be configured here.</EmptyState></main>;
}
