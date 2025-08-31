'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Tag, FolderOpen } from 'lucide-react';
import { BlogPost, Category } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';

interface BlogFiltersProps {
  posts: BlogPost[];
  categories: Category[];
  onFilterResults: (results: BlogPost[]) => void;
}

export default function BlogFilters({ posts, categories, onFilterResults }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Initialize filters from URL parameters
  useEffect(() => {
    const category = searchParams.get('category') || '';
    const tag = searchParams.get('tag') || '';

    setSelectedCategory(category);
    setSelectedTags(tag ? [tag] : []);
  }, [searchParams]);

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts based on filter criteria
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Category filter
      const matchesCategory = !selectedCategory || post.category_id === selectedCategory;

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.tags?.includes(tag));

      return matchesCategory && matchesTags;
    });
  }, [posts, selectedCategory, selectedTags]);

  // Update search results when filters change
  useEffect(() => {
    onFilterResults(filteredPosts);
  }, [filteredPosts, onFilterResults]);

  // Update URL when filters change
  const updateURL = (newCategory: string, newTags: string[]) => {
    const params = new URLSearchParams();
    
    if (newCategory) params.set('category', newCategory);
    if (newTags.length > 0) params.set('tag', newTags[0]); // Support single tag for now
    
    const newURL = params.toString() ? `?${params.toString()}` : '/blog';
    router.push(newURL, { scroll: false });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTags([]);
    updateURL('', []);
  };

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    updateURL(value, selectedTags);
  };

  // Handle tag selection
  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag) 
      ? selectedTags.filter(t => t !== tag)
      : [tag]; // Only allow one tag at a time for URL simplicity
    
    setSelectedTags(newTags);
    updateURL(selectedCategory, newTags);
  };

  // Count posts per category
  const getCategoryCount = (categoryId: string) => {
    return posts.filter(post => post.category_id === categoryId).length;
  };

  // Count posts per tag
  const getTagCount = (tag: string) => {
    return posts.filter(post => post.tags?.includes(tag)).length;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {showFilters && (
            <span className="ml-2 text-sm text-gray-500">
              ({selectedCategory ? 1 : 0} categorie, {selectedTags.length} tags)
            </span>
          )}
        </button>
        
        {(selectedCategory || selectedTags.length > 0) && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Alle filters wissen
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FolderOpen className="inline h-4 w-4 mr-1" />
              Categorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Alle categorieën</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({getCategoryCount(category.id)})
                </option>
              ))}
            </select>
          </div>

          {/* Tags Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="inline h-4 w-4 mr-1" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag} ({getTagCount(tag)})
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Results Summary */}
      <div className="text-sm text-gray-600">
        {selectedCategory || selectedTags.length > 0 ? (
          <span>
            {filteredPosts.length} van {posts.length} posts gevonden
          </span>
        ) : (
          <span>
            Alle {posts.length} posts worden getoond
          </span>
        )}
      </div>
    </div>
  );
}
