import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default function TeamPage() {
  return <main className="admin-page"><PageHeader title="Team" description="Manage staff roles and access." /><EmptyState title="No additional team members">Owner and admin role management will appear here.</EmptyState></main>;
}
