import { getProduct, products } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ProductDetails } from '@/components/product-details';
import { ProductCard } from '@/components/product-card';
import Link from 'next/link';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col pb-16">
      <ProductDetails product={product} />

      {/* Discount Banner */}
      <div className="bg-[#EDE735] py-3 overflow-hidden flex whitespace-nowrap my-16">
        <div className="animate-marquee flex gap-8 whitespace-nowrap pl-8">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="text-black font-semibold text-[20px] tracking-wide flex items-center gap-8">
              <span>NEW SEASON</span>
              <span>*</span>
              <span>%20 DISCOUNT</span>
              <span>*</span>
            </span>
          ))}
        </div>
      </div>

      {/* Maybe you like section */}
      <section className="max-w-[1440px] mx-auto w-full px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-[32px] font-semibold text-black">Maybe you like</h2>
          <Link href="/all-products" className="text-[#696969] hover:text-black hidden sm:block">
            See all
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10">
          {products.filter(p => p.id !== product.id).slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
