import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revokeAdminSession } from '@/lib/db';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (token) {
    await revokeAdminSession(token);
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set('admin_session', '', { path: '/', maxAge: 0 });
  return response;
}
