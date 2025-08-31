'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X, Tag, FolderOpen } from 'lucide-react';
import { BlogPost, Category } from '@/lib/types';

interface BlogSearchProps {
  posts: BlogPost[];
  categories: Category[];
  onSearchResults: (results: BlogPost[]) => void;
}

export default function BlogSearch({ posts, categories, onSearchResults }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

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

  // Filter posts based on search criteria
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = !selectedCategory || post.category_id === selectedCategory;

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.tags?.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [posts, searchTerm, selectedCategory, selectedTags]);

  // Update search results when filters change
  useEffect(() => {
    onSearchResults(filteredPosts);
  }, [filteredPosts, onSearchResults]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTags([]);
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Unknown';
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
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Zoek in blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

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
        
        {(searchTerm || selectedCategory || selectedTags.length > 0) && (
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
              onChange={(e) => setSelectedCategory(e.target.value)}
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

      {/* Search Results Summary */}
      <div className="text-sm text-gray-600">
        {searchTerm || selectedCategory || selectedTags.length > 0 ? (
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
