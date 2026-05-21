'use client';
import { useState } from 'react';

export default function ContactPage() {
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

  const LBL = 'block text-[10px] uppercase tracking-[0.22em] text-[#696969] mb-2';
  const INP = 'w-full border-b border-gray-300 py-2.5 text-sm outline-none focus:border-black transition-colors bg-transparent placeholder:text-[#aaa]';

  return (
    <div className="flex flex-col pb-20">
      <section className="max-w-[1100px] mx-auto w-full px-4 sm:px-6 py-16">

        <div className="mb-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#696969] mb-2">Get in touch</p>
          <h1 className="text-[32px] font-semibold text-black">Contact Us</h1>
        </div>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Left — contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#696969] mb-3">Phone</p>
              <a href="tel:+9779800000000" className="text-[15px] text-black hover:opacity-60 transition-opacity">
                +977 98-0000-0000
              </a>
              <p className="text-[12px] text-[#696969] mt-1">Sun – Fri, 10am – 6pm NPT</p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#696969] mb-3">Email</p>
              <a href="mailto:hello@danana.com.np" className="text-[15px] text-black hover:opacity-60 transition-opacity">
                hello@danana.com.np
              </a>
              <p className="text-[12px] text-[#696969] mt-1">We reply within 24 hours</p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#696969] mb-3">Location</p>
              <p className="text-[15px] text-black">Kathmandu, Nepal</p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {success ? (
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
            ) : (
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
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
