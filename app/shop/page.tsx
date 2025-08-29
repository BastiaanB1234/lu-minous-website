import { Metadata } from 'next';
import ShopHeader from '../../shop/components/layout/ShopHeader';
import ShopFooter from '../../shop/components/layout/ShopFooter';
import HeroSection from '../../shop/components/sections/HeroSection';
import FeaturedProducts from '../../shop/components/sections/FeaturedProducts';
import CategoryShowcase from '../../shop/components/sections/CategoryShowcase';

export const metadata: Metadata = {
  title: 'Lu Minous Webshop - Premium Nuts & Dried Fruits',
  description: 'Discover our premium selection of nuts, dried fruits, and superfoods. Fresh, healthy, and delicious products for a better lifestyle.',
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />
      
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategoryShowcase />
      </main>
      
      <ShopFooter />
    </div>
  );
}
