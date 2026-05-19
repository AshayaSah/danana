import { ProductListClient } from '@/components/product-list-client';

export default function AllProductsPage() {
  return (
    <div className="flex flex-col pb-16">
      <section className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-12">
        <h1 className="text-[32px] font-semibold text-black mb-8">All Products</h1>
        <ProductListClient />
      </section>
    </div>
  );
}
