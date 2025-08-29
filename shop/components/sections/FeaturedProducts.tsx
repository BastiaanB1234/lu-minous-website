import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '../../lib/types';
import { getProducts } from '../../lib/database';

// Server component - data wordt server-side opgehaald
export default async function FeaturedProducts() {
  let products: Product[] = [];
  let error = false;

  try {
    products = await getProducts({ featured: true, limit: 4 });
  } catch (err) {
    console.error('Error loading featured products:', err);
    error = true;
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Uitgelichte Producten
            </h2>
            <p className="text-gray-600 mb-8">
              Er is een fout opgetreden bij het laden van de producten.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Uitgelichte Producten
            </h2>
            <p className="text-gray-600 mb-8">
              Geen uitgelichte producten gevonden.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Uitgelichte Producten
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600"
          >
            Ontdek onze meest populaire noten en zuidvruchten, zorgvuldig geselecteerd voor de beste smaak en kwaliteit.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gradient-to-br from-orange-50 to-red-50 rounded-lg flex items-center justify-center mb-4">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-4xl">🥜</span>
                )}
              </div>
              
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.shortDescription || product.description}
                </p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    €{product.price.toFixed(2)}
                  </span>
                  {product.comparePrice && product.comparePrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      €{product.comparePrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.featured && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                    Uitgelicht
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{product.category.name}</span>
                {product.weight && (
                  <span>{product.weight}g</span>
                )}
              </div>

              <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Toevoegen aan mandje
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors"
          >
            Bekijk Alle Producten
          </Link>
        </div>
      </div>
    </section>
  );
}
