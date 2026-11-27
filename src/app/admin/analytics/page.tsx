import { PageHeader } from '@/components/admin/PageHeader';
import { StatCard } from '@/components/admin/StatCard';

export default function AnalyticsPage() {
  return <main className="admin-page"><PageHeader title="Analytics" description="Understand sales and customer behavior." /><div className="admin-grid">{['Revenue', 'Conversion', 'Average order', 'Returning customers'].map((label) => <StatCard key={label} label={label} />)}</div></main>;
}
