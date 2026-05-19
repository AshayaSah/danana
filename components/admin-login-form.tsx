"use client";

import type { FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('2002nischal@gmail.com');
  const [password, setPassword] = useState('abcdefgh');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError('Invalid admin credentials');
      return;
    }

    router.refresh();
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] grid place-items-center px-4 py-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_35%),linear-gradient(180deg,_#0f172a,_#111827)] text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/8 backdrop-blur-xl shadow-2xl p-8 sm:p-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.28em] text-white/60">Admin Access</p>
          <h1 className="mt-2 text-3xl font-semibold">MINNA backend login</h1>
          <p className="mt-2 text-sm text-white/65">Enter the admin credentials stored in Neon to manage products, pricing, and catalog data.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-white/70">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-emerald-300/50"
              type="email"
              placeholder="Admin email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-emerald-300/50"
              type="password"
              placeholder="Password"
            />
          </div>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-400 px-4 py-3 font-medium text-slate-950 transition hover:bg-emerald-300 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login to admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
