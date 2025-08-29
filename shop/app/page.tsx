import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lu Minous Nuts & Dried Fruits - Premium Quality Nuts & Dried Fruits',
  description: 'Discover our premium selection of nuts, dried fruits, and superfoods. Fresh, healthy, and delicious products for a better lifestyle.',
};

export default function ShopHomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Lu Minous Shop</h1>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Welkom bij onze Webshop
        </h2>
        <p className="text-gray-600 text-lg">
          Hier komen de producten uit de database te staan.
        </p>
      </main>
    </div>
  );
}
