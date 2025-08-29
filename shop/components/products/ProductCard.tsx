'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../../lib/types';
import { useCart } from '../../lib/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div
      className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-6xl">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <span>🥜</span>
          )}
        </div>
        
        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-orange-600 transition-colors shadow-lg">
            <Heart className="w-5 h-5" />
          </button>
          <Link
            href={`/shop/products/${product.slug}`}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-orange-600 transition-colors shadow-lg"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>

        {/* Stock Badge */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Nog {product.stock} op voorraad
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Uitverkocht
          </div>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full">
            Uitgelicht
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-orange-600 font-medium mb-2">
          {product.category.name}
        </div>

        {/* Product Name */}
        <Link href={`/shop/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        {product.shortDescription && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
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
          
          {/* Weight */}
          {product.weight && (
            <span className="text-xs text-gray-500">
              {product.weight}g
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>
            {product.stock === 0 ? 'Uitverkocht' : 'Toevoegen aan mandje'}
          </span>
        </button>
      </div>

      {/* Hover Effect Border */}
      <div className={`absolute inset-0 border-2 border-orange-500 rounded-xl transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </motion.div>
  );
}
