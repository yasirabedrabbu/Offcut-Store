import '@/styles/admin.css';
import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/auth/server';
import { Sidebar } from '@/components/admin/Sidebar';
import { Topbar } from '@/components/admin/Topbar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireRole(['owner', 'admin', 'packer', 'support']);
  if (!profile) redirect('/admin/login');
  return <div className="admin-shell"><Sidebar role={profile.role} /><div className="admin-content"><Topbar name={profile.full_name || 'Team member'} />{children}</div></div>;
}
