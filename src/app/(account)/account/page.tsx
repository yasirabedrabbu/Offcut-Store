import { redirect } from 'next/navigation';
import { getProfile } from '@/lib/auth/server';
import { PageHeader } from '@/components/admin/PageHeader';

export default async function AccountPage() {
  const profile = await getProfile();
  if (!profile) redirect('/login');
  return <main className="admin-page"><PageHeader title="Account" description="Your customer profile." /><p>{profile.full_name || 'Customer'}</p><p>{profile.phone || 'Phone not added'}</p><p>{profile.role}</p></main>;
}
