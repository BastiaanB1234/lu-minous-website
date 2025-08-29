import { Metadata } from 'next';
import ShopHeader from '../../components/layout/ShopHeader';
import ShopFooter from '../../components/layout/ShopFooter';
import HeroSection from '../../components/sections/HeroSection';
import FeaturedProducts from '../../components/sections/FeaturedProducts';
import CategoryShowcase from '../../components/sections/CategoryShowcase';

export const metadata: Metadata = {
  title: 'Lu Minous Nuts & Dried Fruits - Premium Quality Nuts & Dried Fruits',
  description: 'Discover our premium selection of nuts, dried fruits, and superfoods. Fresh, healthy, and delicious products for a better lifestyle.',
};

export default function ShopHomePage() {
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
