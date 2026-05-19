import { NextResponse } from 'next/server';
import { ensureAdminTables, pool, createAdminSession, verifyPassword } from '@/lib/db';

export async function POST(req: Request) {
  await ensureAdminTables();
  const { email, password } = await req.json();

  const result = await pool.query('SELECT id, email, password_salt, password_hash FROM admin_users WHERE email = $1 LIMIT 1', [email]);
  const user = result.rows[0];

  if (!user || !verifyPassword(password || '', user.password_salt, user.password_hash)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await createAdminSession(user.id);
  const response = NextResponse.json({ ok: true });
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
