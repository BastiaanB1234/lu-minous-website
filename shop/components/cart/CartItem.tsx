'use client';

import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../lib/types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    onUpdateQuantity(item.id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="flex items-center py-4 px-6">
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg flex items-center justify-center mr-4">
        {item.product.imageUrl ? (
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-2xl">🥜</span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {item.product.name}
            </h3>
            <p className="text-sm text-gray-500">
              {item.product.category.name}
            </p>
            {item.product.weight && (
              <p className="text-xs text-gray-400">
                {item.product.weight}g per verpakking
              </p>
            )}
          </div>
          
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              €{(item.price * item.quantity).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              €{item.price.toFixed(2)} per stuk
            </p>
          </div>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2 ml-6">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={isUpdating || item.quantity <= 1}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="w-12 text-center text-gray-900 font-medium">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isUpdating}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="ml-6 p-2 text-gray-400 hover:text-red-500 transition-colors"
        title="Verwijder uit winkelwagen"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
