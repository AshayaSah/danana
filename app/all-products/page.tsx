import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductListClient } from '@/components/product-list-client';

type SearchParams = Promise<{
  gender?:   string;
  category?: string;
  size?:     string;
  sort?:     string;
  q?:        string;
}>;

const GENDER_LABEL: Record<string, string> = {
  male:   "Men's",
  female: "Women's",
  unisex: 'Unisex',
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const params = await searchParams;

  const title = params.q
    ? `Search: "${params.q}"`
    : params.gender && GENDER_LABEL[params.gender]
      ? `${GENDER_LABEL[params.gender]} World Cup Jerseys`
      : 'All World Cup Jerseys & Kits';

  const description = params.q
    ? `Search results for "${params.q}" — World Cup jerseys and kits at DANANA Nepal.`
    : params.gender && GENDER_LABEL[params.gender]
      ? `Shop ${GENDER_LABEL[params.gender].toLowerCase()} World Cup jerseys, football kits, and sportswear at DANANA. Fast delivery across Nepal.`
      : 'Browse all World Cup jerseys, national team kits, and football sportswear at DANANA. Shop online with fast delivery across Nepal.';

  return {
    title,
    description,
    alternates: { canonical: '/all-products' },
    openGraph: { title, description },
  };
}

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const pageTitle = params.q
    ? `Search: "${params.q}"`
    : params.gender && GENDER_LABEL[params.gender]
      ? `${GENDER_LABEL[params.gender]} Collection`
      : 'All Products';

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `DANANA — ${pageTitle}`,
    description: 'World Cup jerseys, national team kits, and football sportswear. Shop online with delivery across Nepal.',
    url: 'https://danana.com.np/all-products',
    provider: {
      '@type': 'Organization',
      name: 'DANANA',
    },
  };

  return (
    <div className="flex flex-col pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <section className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-10">
        <h1 className="text-[32px] font-semibold text-black mb-8">{pageTitle}</h1>

        <Suspense fallback={<div className="py-24 text-center text-sm text-[#696969]">Loading…</div>}>
          <ProductListClient
            initialGender={params.gender}
            initialCategory={params.category}
            initialSize={params.size}
            initialSort={params.sort}
            initialQ={params.q}
          />
        </Suspense>
      </section>
    </div>
  );
}
