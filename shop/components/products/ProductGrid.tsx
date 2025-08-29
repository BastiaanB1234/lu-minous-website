'use client';

import { useState, useEffect } from 'react';
import { sampleProducts, searchProducts } from '../../lib/sample-data';
import { Product } from '../../lib/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  categoryFilter?: string;
  searchQuery?: string;
}

export default function ProductGrid({ categoryFilter, searchQuery }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      let filteredProducts = sampleProducts;
      
      // Apply category filter
      if (categoryFilter) {
        filteredProducts = filteredProducts.filter(
          product => product.category.slug === categoryFilter
        );
      }
      
      // Apply search filter
      if (searchQuery) {
        filteredProducts = searchProducts(searchQuery);
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [categoryFilter, searchQuery]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-xl aspect-square mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Geen producten gevonden</h3>
        <p className="text-gray-500">
          {categoryFilter 
            ? `Er zijn geen producten gevonden in de categorie "${categoryFilter}".`
            : searchQuery 
            ? `Er zijn geen producten gevonden voor "${searchQuery}".`
            : 'Er zijn momenteel geen producten beschikbaar.'
          }
        </p>
        {categoryFilter && (
          <button
            onClick={() => window.history.back()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            Terug naar alle producten
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Results Count */}
      <div className="mb-6 text-sm text-gray-600">
        {products.length} {products.length === 1 ? 'product' : 'producten'} gevonden
        {categoryFilter && ` in ${products[0]?.category.name}`}
        {searchQuery && ` voor "${searchQuery}"`}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button (if needed) */}
      {products.length >= 20 && (
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            Laad meer producten
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
