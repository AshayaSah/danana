import { products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import Link from 'next/link';

const heroImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2400';

const collectionImages = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1529139574466-a303027c028b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800',
];

export default function HomePage() {
  return (
    <div className="flex flex-col pb-16">
      {/* Hero Section */}
      <section className="w-full">
        <div className="w-full aspect-[2/1] min-h-[50vh] relative overflow-hidden bg-gray-100">
          <img 
            src={heroImage}
            alt="Hero T-Shirts" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Scrolling Banner */}
        <div className="bg-[#EDE735] py-3 overflow-hidden flex whitespace-nowrap">
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
      </section>

      {/* Products Section */}
      <section className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-[32px] font-semibold text-black">Products</h2>
          <Link href="/all-products" className="text-[#696969] hover:text-black hidden sm:block">
            See all
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10">
          {products.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/all-products" className="border border-black px-6 py-2.5 rounded-sm hover:-translate-y-0.5 transition-transform text-sm font-medium">
            See all products
          </Link>
        </div>
      </section>

      {/* New Collection */}
      <section className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 pt-8 pb-16">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-[32px] font-semibold text-black">New collection</h2>
          <span className="text-[#696969] text-sm hidden sm:block">SOON</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 aspect-[4/1] lg:h-80 overflow-hidden">
          {collectionImages.map((src, index) => (
            <img key={src} src={src} className="w-full h-full object-cover object-center" alt={`New collection ${index + 1}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
