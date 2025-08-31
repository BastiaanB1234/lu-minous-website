'use client';

import React from 'react';
import Link from 'next/link';
import { FolderOpen, Tag, TrendingUp } from 'lucide-react';
import { BlogPost, Category } from '@/lib/types';

interface BlogSidebarProps {
  posts: BlogPost[];
  categories: Category[];
}

export default function BlogSidebar({ posts, categories }: BlogSidebarProps) {
  // Get all unique tags from posts
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Count posts per category
  const getCategoryCount = (categoryId: string) => {
    return posts.filter(post => post.category_id === categoryId).length;
  };

  // Count posts per tag
  const getTagCount = (tag: string) => {
    return posts.filter(post => post.tags?.includes(tag)).length;
  };

  // Get most popular tags (top 10)
  const popularTags = React.useMemo(() => {
    return allTags
      .map(tag => ({ name: tag, count: getTagCount(tag) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [allTags]);

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FolderOpen className="h-5 w-5 mr-2 text-orange-500" />
          Categorieën
        </h3>
        <div className="space-y-2">
          {categories.map(category => {
            const count = getCategoryCount(category.id);
            if (count === 0) return null; // Skip empty categories
            
            return (
              <Link
                key={category.id}
                href={`/blog?category=${category.id}`}
                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors group"
              >
                <span className="text-gray-700 group-hover:text-gray-900">
                  {category.name}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Tag className="h-5 w-5 mr-2 text-blue-500" />
          Populaire Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map(tag => (
            <Link
              key={tag.name}
              href={`/blog?tag=${tag.name}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
            >
              {tag.name}
              <span className="ml-1 text-xs bg-blue-200 text-blue-700 px-1.5 py-0.5 rounded-full">
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Blog Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
          Blog Statistieken
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Totaal Posts</span>
            <span className="font-semibold text-gray-900">{posts.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Categorieën</span>
            <span className="font-semibold text-gray-900">
              {categories.filter(cat => getCategoryCount(cat.id) > 0).length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Unieke Tags</span>
            <span className="font-semibold text-gray-900">{allTags.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
