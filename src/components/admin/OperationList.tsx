export function OperationList({ rows, fields }: { rows: Record<string, unknown>[]; fields: string[] }) {
  if (!rows.length) return <div className="empty-state"><h2>No records yet</h2><p>This area will show records when your store has activity.</p></div>;
  return <div className="admin-list">{rows.map((row, index) => <article key={String(row.id || index)}>{fields.map((field) => <span key={field}>{String(row[field] ?? '')}</span>)}</article>)}</div>;
}
