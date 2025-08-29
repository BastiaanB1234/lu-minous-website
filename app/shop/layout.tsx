import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lu Minous Webshop - Nuts & Dried Fruits',
  description: 'Premium kwaliteit noten en zuidvruchten van over de hele wereld',
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="shop-layout">
      {children}
    </div>
  );
}
