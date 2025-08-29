'use client';

import { useState } from 'react';
import { sampleCategories, sampleProducts } from '../../lib/sample-data';
import { Filter, X, ChevronDown } from 'lucide-react';

export default function ProductFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [sortBy, setSortBy] = useState<string>('name');

  // Get unique tags from products
  const allTags = Array.from(
    new Set(sampleProducts.flatMap(product => product.tags))
  ).sort();

  const handleCategoryToggle = (categorySlug: string) => {
    setSelectedCategories(prev =>
      prev.includes(categorySlug)
        ? prev.filter(cat => cat !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10]);
    setSortBy('name');
  };

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 10;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          <span className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filters Content */}
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-orange-600 hover:text-orange-700 flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Wis alle
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-4">Categorieën</h4>
          <div className="space-y-3">
            {sampleCategories.map((category) => (
              <label key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => handleCategoryToggle(category.slug)}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-4">Prijsbereik</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange[1])}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Min"
                min="0"
                max={priceRange[1]}
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(priceRange[0], Number(e.target.value))}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Max"
                min={priceRange[0]}
                max="100"
              />
            </div>
            <div className="text-xs text-gray-500">
              €{priceRange[0].toFixed(2)} - €{priceRange[1].toFixed(2)}
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-4">Sorteren op</h4>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="name">Naam (A-Z)</option>
            <option value="name-desc">Naam (Z-A)</option>
            <option value="price">Prijs (laag naar hoog)</option>
            <option value="price-desc">Prijs (hoog naar laag)</option>
            <option value="newest">Nieuwste eerst</option>
            <option value="popular">Meest populair</option>
          </select>
        </div>

        {/* Popular Tags */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-4">Populaire Tags</h4>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-orange-100 hover:text-orange-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Actieve Filters</h4>
            <div className="space-y-2">
              {selectedCategories.length > 0 && (
                <div className="text-sm text-gray-600">
                  <strong>Categorieën:</strong> {selectedCategories.length} geselecteerd
                </div>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 10) && (
                <div className="text-sm text-gray-600">
                  <strong>Prijs:</strong> €{priceRange[0].toFixed(2)} - €{priceRange[1].toFixed(2)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
