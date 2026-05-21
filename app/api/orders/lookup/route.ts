import { NextResponse } from 'next/server';
import { pool, ensureOrdersTable } from '@/lib/db';

export async function GET(req: Request) {
  await ensureOrdersTable();
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get('phone')?.trim();
  const id    = searchParams.get('id')?.trim();

  if (!phone && !id) {
    return NextResponse.json({ error: 'Provide phone or id' }, { status: 400 });
  }

  let rows;
  if (id) {
    const res = await pool.query(
      'SELECT * FROM orders WHERE id=$1 LIMIT 1',
      [id]
    );
    rows = res.rows;
  } else {
    const res = await pool.query(
      'SELECT * FROM orders WHERE phone=$1 ORDER BY created_at DESC',
      [phone]
    );
    rows = res.rows;
  }

  return NextResponse.json(rows);
}
