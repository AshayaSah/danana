import { Pool, Client } from 'pg';
import crypto from 'crypto';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('Missing DATABASE_URL environment variable');
}

export const pool = new Pool({ connectionString, max: 5 });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '2002nischal@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'abcdefgh';

function hashPassword(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

export function verifyPassword(password: string, salt: string, storedHash: string) {
  return hashPassword(password, salt) === storedHash;
}

export async function ensureAdminTables() {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text UNIQUE NOT NULL,
      password_salt text NOT NULL,
      password_hash text NOT NULL,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
      token text UNIQUE NOT NULL,
      expires_at timestamptz NOT NULL,
      created_at timestamptz DEFAULT now()
    )
  `);

  const existing = await pool.query('SELECT id FROM admin_users WHERE email = $1 LIMIT 1', [ADMIN_EMAIL]);
  if (existing.rowCount === 0) {
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = hashPassword(ADMIN_PASSWORD, salt);
    await pool.query(
      'INSERT INTO admin_users(email, password_salt, password_hash, created_at, updated_at) VALUES($1,$2,$3,now(),now())',
      [ADMIN_EMAIL, salt, passwordHash]
    );
  }
}

export async function createAdminSession(userId: string) {
  const token = crypto.randomBytes(32).toString('hex');
  await pool.query(
    'INSERT INTO admin_sessions(user_id, token, expires_at) VALUES($1, $2, now() + interval \'7 days\')',
    [userId, token]
  );
  return token;
}

export async function getAdminBySessionToken(token: string) {
  await ensureAdminTables();
  const result = await pool.query(
    `SELECT u.id, u.email
     FROM admin_sessions s
     JOIN admin_users u ON u.id = s.user_id
     WHERE s.token = $1 AND s.expires_at > now()
     LIMIT 1`,
    [token]
  );
  return result.rows[0] || null;
}

export async function revokeAdminSession(token: string) {
  await ensureAdminTables();
  await pool.query('DELETE FROM admin_sessions WHERE token = $1', [token]);
}

export async function ensureTables() {
  // create extension and table if they don't exist
  await pool.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      slug text UNIQUE NOT NULL,
      category text NOT NULL,
      gender text NOT NULL,
      type text NOT NULL,
      actual_price numeric NOT NULL,
      price_after_discount numeric NOT NULL,
      sizes jsonb NOT NULL,
      description text,
      images jsonb NOT NULL,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    )
  `);
}

export async function createNotificationClient() {
  const client = new Client({ connectionString });
  await client.connect();
  return client;
}
