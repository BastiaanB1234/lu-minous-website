import Link from 'next/link';
import { getCategories } from '../../lib/database';

// Server component voor categorie menu
export default async function CategoryMenu() {
  let categories = [];
  let error = false;

  try {
    categories = await getCategories();
  } catch (err) {
    console.error('Error loading categories:', err);
    error = true;
  }

  if (error || categories.length === 0) {
    return (
      <div className="px-4 py-2 text-gray-500">
        {error ? 'Fout bij laden' : 'Geen categorieën gevonden'}
      </div>
    );
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
