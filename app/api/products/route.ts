import { NextResponse } from 'next/server';
import { pool, ensureTables } from '@/lib/db';
import crypto from 'crypto';

export async function GET() {
  await ensureTables();
  const res = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
  return NextResponse.json(res.rows);
}

export async function POST(req: Request) {
  await ensureTables();
  const data = await req.json();
  const id = crypto.randomUUID();
  const {
    name,
    slug,
    category,
    gender,
    type,
    actual_price,
    price_after_discount,
    sizes,
    description,
    images,
  } = data;

  const query = `INSERT INTO products(id,name,slug,category,gender,type,actual_price,price_after_discount,sizes,description,images,created_at,updated_at)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,now(),now()) RETURNING *`;
  const values = [
    id,
    name,
    slug,
    category,
    gender,
    type,
    actual_price,
    price_after_discount,
    JSON.stringify(sizes || []),
    description || null,
    JSON.stringify(images || []),
  ];

  const res = await pool.query(query, values);

  // notify listeners
  const payload = JSON.stringify({ action: 'create', product: res.rows[0] });
  await pool.query(`NOTIFY products, '${payload.replace(/'/g, "''")}'`);

  return NextResponse.json(res.rows[0]);
}
