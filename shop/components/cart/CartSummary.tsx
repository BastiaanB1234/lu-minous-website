'use client';

import { useCart } from '../../lib/hooks/useCart';
import { CartItem } from '../../lib/types';

interface CartSummaryProps {
  cart: CartItem[];
}

export default function CartSummary({ cart }: CartSummaryProps) {
  const { getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal >= 25 ? 0 : 4.95; // Gratis verzending vanaf €25
  const tax = subtotal * 0.21; // 21% BTW
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Bestelling Samenvatting</h2>
      
      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotaal ({cart.length} {cart.length === 1 ? 'product' : 'producten'})</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Verzending</span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
            {shipping === 0 ? 'Gratis' : `€${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>BTW (21%)</span>
          <span>€{tax.toFixed(2)}</span>
        </div>
        
        {shipping > 0 && (
          <div className="text-xs text-green-600 bg-green-50 p-3 rounded-lg">
            <strong>Tip:</strong> Bestel voor €{(25 - subtotal).toFixed(2)} meer en krijg gratis verzending!
          </div>
        )}
      </div>
      
      {/* Total */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Totaal</span>
          <span>€{total.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Inclusief BTW en verzending
        </p>
      </div>
      
      {/* Checkout Button */}
      <button
        disabled={cart.length === 0}
        className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {cart.length === 0 ? 'Winkelwagen is leeg' : 'Afrekenen'}
      </button>
      
      {/* Additional Info */}
      <div className="mt-6 text-xs text-gray-500 space-y-2">
        <div className="flex items-start space-x-2">
          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Gratis verzending vanaf €25,-</span>
        </div>
        <div className="flex items-start space-x-2">
          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Levering binnen 1-2 werkdagen</span>
        </div>
        <div className="flex items-start space-x-2">
          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Veilige betaling</span>
        </div>
        <div className="flex items-start space-x-2">
          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>30 dagen retourrecht</span>
        </div>
      </div>
    </div>
  );
}
