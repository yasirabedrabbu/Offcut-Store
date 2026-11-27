import { requireRole } from '@/lib/auth/server';
import { PageHeader } from '@/components/admin/PageHeader';
import { ThemeEditor } from '@/components/admin/ThemeEditor';
import { EmptyState } from '@/components/ui/EmptyState';

export default async function AppearancePage() {
  const profile = await requireRole(['owner', 'admin']); if (!profile) return null;
  return <main className="admin-page"><PageHeader title="Appearance" description="Customize the storefront without rebuilding." /><ThemeEditor /><EmptyState title="Home sections">Section ordering will be editable here.</EmptyState></main>;
}
