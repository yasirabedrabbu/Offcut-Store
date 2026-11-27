import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ShippingPage() {
  return <main className="admin-page"><PageHeader title="Shipping" description="Configure Bangladesh delivery zones and rates." /><EmptyState title="No shipping zones configured">Add zones after connecting Supabase.</EmptyState></main>;
}
