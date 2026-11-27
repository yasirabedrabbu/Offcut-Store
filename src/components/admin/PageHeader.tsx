export function PageHeader({ title, description }: { title: string; description?: string }) {
  return <header className="admin-page-header"><div><h1>{title}</h1>{description && <p>{description}</p>}</div></header>;
}
