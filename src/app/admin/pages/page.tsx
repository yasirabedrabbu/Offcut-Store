import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default function PagesPage() {
  return <main className="admin-page"><PageHeader title="Pages" description="Manage store content and policies." /><EmptyState title="No pages created">Create About, FAQ, shipping, and returns pages here.</EmptyState></main>;
}
