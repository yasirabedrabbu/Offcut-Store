export function StatCard({ label }: { label: string }) {
  return <div className="admin-stat"><span>{label}</span><strong className="skeleton" aria-label="Loading" /></div>;
}
