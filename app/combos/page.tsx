import type { Metadata } from 'next';
import { getCombos, getProducts } from '@/lib/db';
import { CombosClient } from '@/components/combos-client';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Combo Deals — Bundle & Save',
  description:
    'Get more for less with DANANA combo deals. Bundle World Cup jerseys and football kits together and save on every order. Fast delivery across Nepal.',
  alternates: { canonical: '/combos' },
  openGraph: {
    title: 'Combo Deals — Bundle & Save | DANANA',
    description:
      'Bundle World Cup jerseys and kits together and save. Shop DANANA combo deals with fast delivery across Nepal.',
  },
};

export default async function CombosPage() {
  const [combos, products] = await Promise.all([getCombos(), getProducts()]);

  const itemListSchema = combos.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'DANANA Combo Deals',
        description: 'Bundle deals on World Cup jerseys and football kits',
        numberOfItems: combos.length,
        itemListElement: combos.map((combo, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: combo.name,
          url: `https://danana.com.np/combos`,
          offers: {
            '@type': 'Offer',
            price: Number(combo.combo_price),
            priceCurrency: 'NPR',
          },
        })),
      }
    : null;

  return (
    <div className="flex flex-col pb-20">
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      <section className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-10">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#696969] mb-1">Better together</p>
          <h1 className="text-[32px] font-semibold text-black">Combo Deals</h1>
          <p className="text-[#696969] text-sm mt-2">
            Bundle your favourites and save more. Select sizes for each item, then add the whole bundle to your cart.
          </p>
        </div>

        {combos.length === 0 ? (
          <div className="py-24 text-center text-sm text-[#696969]">No combo deals available yet. Check back soon.</div>
        ) : (
          <CombosClient combos={combos} products={products} />
        )}
      </section>
    </div>
  );
}
