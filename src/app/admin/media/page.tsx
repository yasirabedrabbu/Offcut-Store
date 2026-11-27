import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default function MediaPage() {
  return <main className="admin-page"><PageHeader title="Media library" description="Manage the images used across your storefront." /><EmptyState title="No media yet">Upload your first image to begin.</EmptyState></main>;
}
