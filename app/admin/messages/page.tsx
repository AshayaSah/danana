import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ensureAdminTables, getAdminBySessionToken } from '@/lib/db';
import { AdminShell } from '@/components/admin-shell';
import { AdminMessages } from '@/components/admin-messages';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  await ensureAdminTables();
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  const admin = token ? await getAdminBySessionToken(token) : null;
  if (!admin) redirect('/admin');

  return (
    <AdminShell adminEmail={admin.email}>
      <AdminMessages />
    </AdminShell>
  );
}
