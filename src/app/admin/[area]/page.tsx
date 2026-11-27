import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default async function AdminArea({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const title = area.charAt(0).toUpperCase() + area.slice(1);
  return <main className="admin-page"><PageHeader title={title} /><EmptyState title={`${title} is ready for the next phase.`}>This area is connected to the admin shell.</EmptyState></main>;
}
