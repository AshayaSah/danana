import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { pool, ensureMessagesTable, getAdminBySessionToken } from '@/lib/db';

type Ctx = { params: Promise<{ id: string }> };

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return null;
  return getAdminBySessionToken(token);
}

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await ensureMessagesTable();
  const { id } = await params;
  const { is_read } = await req.json();
  const res = await pool.query(
    'UPDATE messages SET is_read=$1 WHERE id=$2 RETURNING *',
    [is_read ?? true, id]
  );
  return NextResponse.json(res.rows[0]);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await ensureMessagesTable();
  const { id } = await params;
  await pool.query('DELETE FROM messages WHERE id=$1', [id]);
  return NextResponse.json({ ok: true });
}
