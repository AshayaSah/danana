import { cookies } from 'next/headers';
import { AdminLoginForm } from '@/components/admin-login-form';
import { AdminDashboard } from '@/components/admin-dashboard';
import { ensureAdminTables, getAdminBySessionToken } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  await ensureAdminTables();
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  const admin = token ? await getAdminBySessionToken(token) : null;

  if (!admin) {
    return <AdminLoginForm />;
  }

  return <AdminDashboard adminEmail={admin.email} />;
}
