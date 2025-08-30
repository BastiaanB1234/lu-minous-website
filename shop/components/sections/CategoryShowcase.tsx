'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Category } from '../../lib/types';

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        // Use static JSON files with bypass token
        const response = await fetch('/api/categories.json', {
          headers: {
            'x-vercel-protection-bypass': 'LhaKcRSGcRe5cU6WxBVrqiIleQJkYeSR'
          }
        });
        const result = await response.json();
        
        if (result.success) {
          setCategories(result.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading categories:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Categorieën
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Categorieën
          </h2>
          <div className="text-center text-gray-600">
            Er is een fout opgetreden bij het laden van de categorieën.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Ontdek Onze Categorieën
        </h2>
        
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={category.id}>
                <Link href={`/shop/products?category=${category.slug}`}>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
                    <div className="aspect-square bg-gradient-to-br from-orange-50 to-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      {category.imageUrl ? (
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-4xl">🥜</span>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 text-center group-hover:text-orange-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    {category.description && (
                      <p className="text-sm text-gray-600 text-center line-clamp-2">
                        {category.description}
                      </p>
                    )}
                    
                    <div className="text-center mt-4">
                      <span className="text-xs text-orange-600 font-medium">
                        {category.products.length} producten
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            Geen categorieën gevonden.
          </div>
        )}
      </div>
    </section>
  );
}
