import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default function FraudPage() {
  return <main className="admin-page"><PageHeader title="Fraud and blocklist" description="Review risk signals and blocked contacts." /><EmptyState title="No blocked contacts">Risk controls will appear here.</EmptyState></main>;
}
