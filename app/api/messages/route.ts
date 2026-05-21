import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { pool, ensureMessagesTable, getAdminBySessionToken } from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token || !(await getAdminBySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const messages = await getMessages();
  return NextResponse.json(messages);
}

async function getMessages() {
  await ensureMessagesTable();
  const res = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
  return res.rows;
}

export async function POST(req: Request) {
  await ensureMessagesTable();
  const { name, phone, email, message } = await req.json();
  if (!name?.trim() || !phone?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name, phone and message are required' }, { status: 400 });
  }
  const res = await pool.query(
    `INSERT INTO messages (name, phone, email, message) VALUES ($1,$2,$3,$4) RETURNING *`,
    [name.trim(), phone.trim(), email?.trim() || null, message.trim()]
  );
  return NextResponse.json(res.rows[0], { status: 201 });
}
