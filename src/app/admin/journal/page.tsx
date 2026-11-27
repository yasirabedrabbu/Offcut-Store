import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default function JournalPage() {
  return <main className="admin-page"><PageHeader title="Journal" description="Publish stories and updates." /><EmptyState title="No journal posts">Your published posts will appear here.</EmptyState></main>;
}
