'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Category } from '../../lib/types';

export default function CategoryMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        // Use static JSON files as temporary solution
        const response = await fetch('/api/categories.json');
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
    return <div className="px-4 py-2 text-gray-500">Laden...</div>;
  }

  if (error) {
    return <div className="px-4 py-2 text-gray-500">Fout bij laden</div>;
  }

  if (categories.length === 0) {
    return <div className="px-4 py-2 text-gray-500">Geen categorieën gevonden</div>;
  }

  return (
    <>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/shop/products?category=${category.slug}`}
          className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
        >
          {category.name}
        </Link>
      ))}
    </>
  );
}
