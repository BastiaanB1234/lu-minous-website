import { Metadata } from 'next';
import { sampleCategories, sampleProducts } from '../../lib/shop/sample-data';

export const metadata: Metadata = {
  title: 'Lu Minous Nuts & Dried Fruits - Premium Quality Nuts & Dried Fruits',
  description: 'Discover our premium selection of nuts, dried fruits, and superfoods. Fresh, healthy, and delicious products for a better lifestyle.',
};

export default function ShopHomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LM</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Lu Minous</span>
              <span className="text-sm text-gray-500">Nuts & Dried Fruits</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/shop" className="text-gray-700 hover:text-orange-600">Home</a>
              <a href="/shop/products" className="text-gray-700 hover:text-orange-600">Producten</a>
              <a href="/shop/cart" className="text-gray-700 hover:text-orange-600">Winkelwagen</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Ontdek de{' '}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Smaak van
            </span>{' '}
            Natuur
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Proef onze premium selectie noten en zuidvruchten van over de hele wereld. 
            Vers gebrand, gezond en heerlijk voor een betere levensstijl.
          </p>
          <a
            href="/shop/products"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Bekijk Assortiment
          </a>
        </div>

        {/* Featured Products */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Uitgelichte Producten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.filter(p => p.featured).slice(0, 4).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-orange-50 to-red-50 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-4xl">🥜</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.shortDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    Toevoegen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Onze Categorieën
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-orange-50 to-red-50 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">🥜</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <a
                  href={`/shop/products?category=${category.slug}`}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Bekijk producten →
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Lu Minous Nuts & Dried Fruits. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
