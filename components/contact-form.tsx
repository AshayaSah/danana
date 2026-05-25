'use client';
import { useState } from 'react';

const LBL = 'block text-[10px] uppercase tracking-[0.22em] text-[#696969] mb-2';
const INP = 'w-full border-b border-gray-300 py-2.5 text-sm outline-none focus:border-black transition-colors bg-transparent placeholder:text-[#aaa]';

export function ContactForm() {
  const [form,    setForm]    = useState({ name: '', phone: '', email: '', message: '' });
  const [busy,    setBusy]    = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch {
      setError('Could not send message. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  if (success) {
    return (
      <div className="bg-[#f0fdf4] border border-[#bbf7d0] px-6 py-8 text-center">
        <p className="text-[18px] font-medium text-black mb-2">Message received!</p>
        <p className="text-[14px] text-[#696969]">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 border border-gray-300 px-5 py-2 text-[13px] hover:border-black transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={LBL}>Name <span className="text-[#FA5D42]">*</span></label>
          <input
            required value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className={INP} placeholder="Your name"
          />
        </div>
        <div>
          <label className={LBL}>Phone <span className="text-[#FA5D42]">*</span></label>
          <input
            required value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className={INP} placeholder="98XXXXXXXX" type="tel"
          />
        </div>
      </div>

      <div>
        <label className={LBL}>
          Email <span className="text-[#aaa] normal-case tracking-normal font-normal">· optional</span>
        </label>
        <input
          value={form.email} type="email"
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className={INP} placeholder="you@example.com"
        />
      </div>

      <div>
        <label className={LBL}>Message <span className="text-[#FA5D42]">*</span></label>
        <textarea
          required rows={5} value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className={INP + ' resize-none'}
          placeholder="Tell us how we can help…"
        />
      </div>

      {error && <p className="text-[13px] text-[#FA5D42]">{error}</p>}

      <button
        type="submit" disabled={busy}
        className="bg-black text-white py-3.5 text-[13px] font-medium tracking-wide hover:bg-black/80 transition-colors disabled:opacity-50"
      >
        {busy ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
