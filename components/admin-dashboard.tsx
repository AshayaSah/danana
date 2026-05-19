"use client";

import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, Boxes, LogOut, PlusCircle, Shirt, Sparkles, Trash2 } from 'lucide-react';

type ProductFormState = {
  name: string;
  slug: string;
  category: string;
  gender: 'male' | 'female' | 'unisex';
  type: 'jersey' | 'tshirt' | 'shirt';
  actual_price: number;
  price_after_discount: number;
  sizes: string[];
  description: string;
  imagesText: string;
};

const emptyForm: ProductFormState = {
  name: '',
  slug: '',
  category: '',
  gender: 'male',
  type: 'tshirt',
  actual_price: 0,
  price_after_discount: 0,
  sizes: ['M'],
  description: '',
  imagesText: '',
};

export function AdminDashboard({ adminEmail }: { adminEmail: string }) {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const response = await fetch('/api/products', { cache: 'no-store' });
    const data = await response.json();
    setProducts(data);
  }

  function toggleSize(size: string) {
    setForm((current) => ({
      ...current,
      sizes: current.sizes.includes(size) ? current.sizes.filter((value) => value !== size) : [...current.sizes, size],
    }));
  }

  function startEdit(product: any) {
    setEditingId(product.id);
    setForm({
      name: product.name ?? '',
      slug: product.slug ?? '',
      category: product.category ?? '',
      gender: (product.gender ?? 'male') as ProductFormState['gender'],
      type: (product.type ?? 'tshirt') as ProductFormState['type'],
      actual_price: Number(product.actual_price ?? 0),
      price_after_discount: Number(product.price_after_discount ?? 0),
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      description: product.description ?? '',
      imagesText: Array.isArray(product.images) ? product.images.join(', ') : '',
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      gender: form.gender,
      type: form.type,
      actual_price: form.actual_price,
      price_after_discount: form.price_after_discount,
      sizes: form.sizes,
      description: form.description,
      images: form.imagesText.split(',').map((value) => value.trim()).filter(Boolean),
    };

    const response = await fetch(editingId ? `/api/products/${editingId}` : '/api/products', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setBusy(false);
    if (!response.ok) return;

    setForm(emptyForm);
    setEditingId(null);
    await loadProducts();
  }

  async function deleteProduct(id: string) {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    setProducts((current) => current.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.refresh();
  }

  const stats = useMemo(() => {
    const total = products.length;
    const men = products.filter((product) => product.gender === 'male').length;
    const women = products.filter((product) => product.gender === 'female').length;
    const active = products.filter((product) => Number(product.price_after_discount || 0) > 0).length;
    return { total, men, women, active };
  }, [products]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100">
      <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-slate-950/95 px-6 py-8 lg:min-h-[calc(100vh-5rem)] lg:border-b-0 lg:border-r lg:sticky lg:top-0">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">MINNA Admin</p>
            <h1 className="mt-2 text-3xl font-semibold">Catalog Control</h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">Manage men and women inventory, pricing, images, and product types from one place.</p>
          </div>

          <div className="space-y-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3 text-sm text-slate-300"><BarChart3 className="h-4 w-4 text-emerald-300" /> Live overview</div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-900 p-3"><div className="text-slate-500">Products</div><div className="mt-1 text-xl font-semibold">{stats.total}</div></div>
                <div className="rounded-2xl bg-slate-900 p-3"><div className="text-slate-500">Active</div><div className="mt-1 text-xl font-semibold">{stats.active}</div></div>
                <div className="rounded-2xl bg-slate-900 p-3"><div className="text-slate-500">Men</div><div className="mt-1 text-xl font-semibold">{stats.men}</div></div>
                <div className="rounded-2xl bg-slate-900 p-3"><div className="text-slate-500">Women</div><div className="mt-1 text-xl font-semibold">{stats.women}</div></div>
              </div>
            </div>

            <button onClick={logout} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </aside>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/10 via-white/5 to-cyan-400/10 p-6 sm:p-8">
            <div className="flex items-center gap-3 text-emerald-300"><Sparkles className="h-4 w-4" /> Logged in as {adminEmail}</div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-white">Product management</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Create and edit catalog entries with gender, clothing type, size range, pricing, images, and description. Changes are saved in Neon and pushed to the storefront in realtime.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                <Boxes className="h-4 w-4 text-emerald-300" /> backend console
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Product editor</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">{editingId ? 'Edit product' : 'Add new product'}</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">{editingId ? 'Editing mode' : 'Create mode'}</div>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Product name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
                  <Field label="Slug" value={form.slug} onChange={(value) => setForm((current) => ({ ...current, slug: value }))} />
                </div>

                <Field label="Category" value={form.category} onChange={(value) => setForm((current) => ({ ...current, category: value }))} placeholder="Shirts, Outerwear, Basics..." />

                <div className="grid gap-4 md:grid-cols-2">
                  <SelectField label="Audience" value={form.gender} onChange={(value) => setForm((current) => ({ ...current, gender: value as ProductFormState['gender'] }))} options={[{ label: 'Men', value: 'male' }, { label: 'Women', value: 'female' }, { label: 'Unisex', value: 'unisex' }]} />
                  <SelectField label="Type" value={form.type} onChange={(value) => setForm((current) => ({ ...current, type: value as ProductFormState['type'] }))} options={[{ label: 'Jersey', value: 'jersey' }, { label: 'T-shirt', value: 'tshirt' }, { label: 'Shirt', value: 'shirt' }]} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Actual price" type="number" value={String(form.actual_price)} onChange={(value) => setForm((current) => ({ ...current, actual_price: Number(value) }))} />
                  <Field label="Price after discount" type="number" value={String(form.price_after_discount)} onChange={(value) => setForm((current) => ({ ...current, price_after_discount: Number(value) }))} />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Sizes</label>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button key={size} type="button" onClick={() => toggleSize(size)} className={`rounded-full border px-4 py-2 text-sm transition ${form.sizes.includes(size) ? 'border-emerald-400 bg-emerald-400/15 text-emerald-200' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <Field label="Image URLs" value={form.imagesText} onChange={(value) => setForm((current) => ({ ...current, imagesText: value }))} placeholder="Comma-separated image URLs" />
                <label className="block text-sm text-slate-300">
                  Description
                  <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className="mt-2 min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400" placeholder="Product description" />
                </label>

                <div className="flex flex-wrap gap-3">
                  <button disabled={busy} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-emerald-300 disabled:opacity-60">
                    <PlusCircle className="h-4 w-4" /> {busy ? 'Saving...' : editingId ? 'Update product' : 'Create product'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:bg-white/10">
                      Cancel edit
                    </button>
                  )}
                </div>
              </form>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Catalog</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">Products</h3>
                </div>
                <Shirt className="h-5 w-5 text-emerald-300" />
              </div>

              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-medium text-white">{product.name}</div>
                        <div className="mt-1 text-sm text-slate-400">{product.gender} • {product.type} • {product.category}</div>
                        <div className="mt-2 text-sm text-slate-300">Actual: ${Number(product.actual_price ?? 0)} · Discount: ${Number(product.price_after_discount ?? 0)}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(product)} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 hover:bg-white/10">Edit</button>
                        <button onClick={() => deleteProduct(product.id)} className="inline-flex items-center gap-1 rounded-full border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200 hover:bg-red-500/20">
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                      {(Array.isArray(product.sizes) ? product.sizes : []).map((size: string) => <span key={size} className="rounded-full bg-slate-950 px-2.5 py-1">{size}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; }) {
  return (
    <label className="block text-sm text-slate-300">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} type={type} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400" />
    </label>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: { label: string; value: string }[]; }) {
  return (
    <label className="block text-sm text-slate-300">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-400">
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
