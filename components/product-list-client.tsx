"use client";
import React, { useEffect, useState } from 'react';
import { ProductCard } from './product-card';

export function ProductListClient() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    let es: EventSource | null = null;
    fetch('/api/products').then(r => r.json()).then(setProducts);

    es = new EventSource('/api/realtime-products');
    es.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data || '{}');
        if (payload.action === 'create') {
          setProducts(p => [payload.product, ...p]);
        } else if (payload.action === 'update') {
          setProducts(p => p.map(x => x.id === payload.product.id ? payload.product : x));
        } else if (payload.action === 'delete') {
          setProducts(p => p.filter(x => x.id !== payload.id));
        }
      } catch (err) {
        // ignore
      }
    };

    return () => { if (es) es.close(); };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10">
      {products.map(product => (
        <ProductCard key={product.id} product={{
          id: product.id,
          slug: product.slug || product.id,
          title: product.name,
          price: Number(product.price_after_discount || product.actual_price),
          compareAtPrice: Number(product.actual_price),
          images: product.images || [],
          category: product.category || 'Catalog',
          description: product.description || '',
          inStock: true,
        }} />
      ))}
    </div>
  );
}
