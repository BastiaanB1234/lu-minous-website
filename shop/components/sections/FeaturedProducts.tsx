'use client';

import { useEffect, useState } from 'react';
import { Product } from '../../lib/types';
import ProductCard from '../products/ProductCard';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        setLoading(true);
        // Use the root API route that connects to the database
        const response = await fetch('/api/products?featured=true&limit=4');
        const result = await response.json();
        
        if (result.success) {
          setProducts(result.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading featured products:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Uitgelichte Producten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Uitgelichte Producten
          </h2>
          <div className="text-center text-gray-600">
            Er is een fout opgetreden bij het laden van de producten.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Uitgelichte Producten
        </h2>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            Geen uitgelichte producten gevonden.
          </div>
        )}
      </div>
    </section>
  );
}
