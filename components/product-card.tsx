import Link from 'next/link';
import { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col gap-3">
      <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden w-full">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-[15px] text-[#000]">{product.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          {product.compareAtPrice && (
            <span className="text-[#696969] line-through text-[15px]">${product.compareAtPrice}</span>
          )}
          <span className="text-[#FA5D42] text-[15px] font-medium">${product.price}</span>
        </div>
      </div>
    </Link>
  );
}
