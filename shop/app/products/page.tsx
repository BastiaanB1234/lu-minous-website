import { Metadata } from 'next';
import ShopHeader from '../../components/layout/ShopHeader';
import ShopFooter from '../../components/layout/ShopFooter';
import ProductGrid from '../../components/products/ProductGrid';
import ProductFilters from '../../components/products/ProductFilters';

export const metadata: Metadata = {
  title: 'Products - Lu Minous Nuts & Dried Fruits',
  description: 'Browse our complete collection of premium nuts, dried fruits, and superfoods.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64">
            <ProductFilters />
          </aside>
          
          {/* Main Product Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
              <p className="text-gray-600 mt-2">Discover our premium selection of nuts and dried fruits</p>
            </div>
            <ProductGrid />
          </div>
        </div>
      </main>
      
      <ShopFooter />
    </div>
  );
}
