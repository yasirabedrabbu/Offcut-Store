import { PageHeader } from '@/components/admin/PageHeader';
import { StatCard } from '@/components/admin/StatCard';

export default function AdminOverview() {
  return <main className="admin-page"><PageHeader title="Overview" description="Your store at a glance." /><div className="admin-grid">{['Sales', 'Orders', 'Customers', 'Conversion'].map((label) => <StatCard key={label} label={label} />)}</div></main>;
}
