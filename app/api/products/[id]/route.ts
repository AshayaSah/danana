import { NextResponse } from 'next/server';
import { pool, ensureTables } from '@/lib/db';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: Request, { params }: RouteContext) {
  await ensureTables();
  const { id } = await params;
  const data = await req.json();
  const fields = [] as string[];
  const values = [] as any[];
  let idx = 1;
  for (const key of Object.keys(data)) {
    if (['name','slug','category','gender','type','actual_price','price_after_discount','sizes','description','images'].includes(key)) {
      fields.push(`${key} = $${idx}`);
      values.push(key === 'sizes' || key === 'images' ? JSON.stringify((data as any)[key]) : (data as any)[key]);
      idx++;
    }
  }
  if (fields.length === 0) return NextResponse.json({ error: 'no fields' }, { status: 400 });
  values.push(id);
  const q = `UPDATE products SET ${fields.join(',')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
  const res = await pool.query(q, values);

  const payload = JSON.stringify({ action: 'update', product: res.rows[0] });
  await pool.query(`NOTIFY products, '${payload.replace(/'/g, "''")}'`);

  return NextResponse.json(res.rows[0]);
}

export async function DELETE(req: Request, { params }: RouteContext) {
  await ensureTables();
  const { id } = await params;
  const res = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
  const payload = JSON.stringify({ action: 'delete', id });
  await pool.query(`NOTIFY products, '${payload.replace(/'/g, "''")}'`);
  return NextResponse.json({ deleted: res.rows[0] || null });
}
