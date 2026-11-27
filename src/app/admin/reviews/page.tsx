import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ReviewsPage() {
  return <main className="admin-page"><PageHeader title="Reviews" description="Approve and manage customer reviews." /><EmptyState title="No reviews awaiting approval">Approved reviews will appear on product pages.</EmptyState></main>;
}
