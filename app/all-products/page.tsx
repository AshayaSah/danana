import { products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';

export default function AllProductsPage() {
  return (
    <div className="flex flex-col pb-16">
      <section className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-12">
        <h1 className="text-[32px] font-semibold text-black mb-8">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
