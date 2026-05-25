import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/db';
import { ProductDetails } from '@/components/product-details';
import { ProductCard } from '@/components/product-card';

export const dynamic = 'force-dynamic';

const APP_URL = process.env.APP_URL ?? 'https://danana.com.np';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const title       = product.meta_title       || `${product.name} — DANANA`;
  const description = product.meta_description || product.description || undefined;
  const image       = product.image_groups?.[0]?.images?.[0];
  const url         = `${APP_URL}/product/${slug}`;

  return {
    title,
    description,
    keywords: product.meta_keywords || undefined,
    alternates: { canonical: `/product/${slug}` },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: image ? [{ url: image, alt: product.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ]);

  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const basePrice    = Number(product.base_price);
  const comparePrice = product.compare_price ? Number(product.compare_price) : null;
  const image        = product.image_groups?.[0]?.images?.[0];
  const allImages    = (product.image_groups ?? []).flatMap((g: { images: string[] }) => g.images);
  const inStock      = (product.variants ?? []).some((v: { stock: number }) => v.stock > 0);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || undefined,
    image: allImages.length > 0 ? allImages : image ? [image] : undefined,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'DANANA',
    },
    offers: {
      '@type': 'Offer',
      url: `${APP_URL}/product/${slug}`,
      priceCurrency: 'NPR',
      price: basePrice,
      ...(comparePrice && comparePrice > basePrice ? { priceValidUntil: '2026-12-31' } : {}),
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'DANANA',
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'NP',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
  };

  return (
    <div className="flex flex-col pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <ProductDetails product={product} />

      {related.length > 0 && (
        <section className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 mt-16">
          <h2 className="text-[28px] font-semibold text-black mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
