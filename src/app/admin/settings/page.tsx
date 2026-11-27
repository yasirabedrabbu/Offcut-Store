import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default function SettingsPage() {
  return <main className="admin-page"><PageHeader title="Settings" description="Store information, locale, SEO, and support details." /><EmptyState title="Settings are ready">Connect Supabase to edit store settings.</EmptyState></main>;
}
