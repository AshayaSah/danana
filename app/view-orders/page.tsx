'use client';
import { useState } from 'react';
import { Search, Package, Clock, CheckCircle } from 'lucide-react';

type OrderItem = {
  productTitle: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  isCombo?: boolean;
  comboItems?: Array<{ productName: string; size: string; kit?: string }>;
};

type Order = {
  id: string;
  customer_name: string;
  phone: string;
  address: string | null;
  items: OrderItem[];
  subtotal: number;
  promo_code: string | null;
  discount_amount: number;
  status: string;
  created_at: string;
};

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  pending:   { label: 'Pending',    color: 'text-orange-500 bg-orange-50 border-orange-200' },
  confirmed: { label: 'Confirmed',  color: 'text-blue-600 bg-blue-50 border-blue-200' },
  shipped:   { label: 'Shipped',    color: 'text-purple-600 bg-purple-50 border-purple-200' },
  delivered: { label: 'Delivered',  color: 'text-[#027D48] bg-green-50 border-green-200' },
  cancelled: { label: 'Cancelled',  color: 'text-[#FA5D42] bg-red-50 border-red-200' },
};

export default function ViewOrdersPage() {
  const [tab,     setTab]     = useState<'phone' | 'id'>('phone');
  const [input,   setInput]   = useState('');
  const [orders,  setOrders]  = useState<Order[] | null>(null);
  const [busy,    setBusy]    = useState(false);
  const [error,   setError]   = useState('');

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setBusy(true);
    setError('');
    setOrders(null);
    try {
      const param = tab === 'phone' ? `phone=${encodeURIComponent(q)}` : `id=${encodeURIComponent(q)}`;
      const res   = await fetch(`/api/orders/lookup?${param}`);
      const data  = await res.json();
      if (!res.ok) { setError(data.error ?? 'Lookup failed.'); return; }
      if (!data.length) {
        setError(tab === 'phone'
          ? 'No orders found for that phone number.'
          : 'No order found with that ID.');
        return;
      }
      setOrders(data);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const INP = 'w-full border-b border-gray-300 py-2.5 text-sm outline-none focus:border-black transition-colors bg-transparent placeholder:text-[#aaa]';

  return (
    <div className="flex flex-col pb-20">
      <section className="max-w-[700px] mx-auto w-full px-4 sm:px-6 py-16">

        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#696969] mb-2">Order history</p>
          <h1 className="text-[32px] font-semibold text-black">View Your Orders</h1>
          <p className="text-sm text-[#696969] mt-2">
            Look up your orders using your phone number or the Order ID from your confirmation.
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex border-b border-gray-200 mb-8">
          {(['phone', 'id'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setInput(''); setOrders(null); setError(''); }}
              className={`px-5 py-2.5 text-[13px] font-medium border-b-2 transition-colors -mb-px ${
                tab === t ? 'border-black text-black' : 'border-transparent text-[#696969] hover:text-black'
              }`}
            >
              {t === 'phone' ? 'By Phone Number' : 'By Order ID'}
            </button>
          ))}
        </div>

        <form onSubmit={lookup} className="flex gap-3 mb-8">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className={INP}
            placeholder={tab === 'phone' ? '98XXXXXXXX' : 'Paste your Order ID…'}
            type={tab === 'phone' ? 'tel' : 'text'}
            required
          />
          <button
            type="submit" disabled={busy || !input.trim()}
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 text-[13px] font-medium hover:bg-black/80 transition-colors disabled:opacity-40 shrink-0"
          >
            <Search className="h-4 w-4" />
            {busy ? 'Looking…' : 'Find'}
          </button>
        </form>

        {error && <p className="text-[13px] text-[#FA5D42] mb-6">{error}</p>}

        {orders && (
          <div className="flex flex-col gap-6">
            {orders.map(order => {
              const status  = STATUS_LABEL[order.status] ?? STATUS_LABEL.pending;
              const final   = Number(order.subtotal) - Number(order.discount_amount);
              const date    = new Date(order.created_at).toLocaleDateString('en-NP', {
                year: 'numeric', month: 'long', day: 'numeric',
              });
              return (
                <div key={order.id} className="border border-gray-100 bg-white overflow-hidden">
                  {/* Order header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4 border-b border-gray-50 bg-gray-50">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#696969] mb-0.5">Order ID</p>
                      <p className="text-[13px] font-mono text-black break-all">{order.id}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#696969] mb-1">{date}</p>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium border ${status.color}`}>
                        {order.status === 'delivered'
                          ? <CheckCircle className="h-3 w-3" />
                          : order.status === 'pending'
                            ? <Clock className="h-3 w-3" />
                            : <Package className="h-3 w-3" />}
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="px-5 py-4 flex flex-col gap-3">
                    {(order.items ?? []).map((item: OrderItem, i: number) => (
                      <div key={i} className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-black truncate">{item.productTitle}</p>
                          {item.isCombo && item.comboItems ? (
                            <div className="mt-0.5 flex flex-col gap-0.5">
                              {item.comboItems.map((ci, j) => (
                                <p key={j} className="text-[11px] text-[#696969]">
                                  {ci.productName}{ci.kit ? ` · ${ci.kit}` : ''} · {ci.size}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[12px] text-[#696969] mt-0.5">
                              {[item.color, item.size && `Size ${item.size}`, `Qty ${item.quantity}`].filter(Boolean).join(' · ')}
                            </p>
                          )}
                        </div>
                        <p className="text-[13px] font-medium shrink-0">
                          Rs. {(Number(item.price) * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t border-gray-50 flex flex-wrap items-center justify-between gap-3 text-[13px]">
                    <p className="text-[#696969]">
                      {order.customer_name}
                      {order.address ? ` · ${order.address}` : ''}
                    </p>
                    <div className="text-right">
                      {Number(order.discount_amount) > 0 && (
                        <p className="text-[#027D48] text-[12px]">
                          Saved Rs. {Number(order.discount_amount).toLocaleString()} with {order.promo_code}
                        </p>
                      )}
                      <p className="font-semibold text-black">
                        Total: Rs. {final.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
