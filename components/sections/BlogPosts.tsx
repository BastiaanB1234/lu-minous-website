'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '../../lib/types';

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadBlogPosts() {
      try {
        setLoading(true);
        const response = await fetch('/api/blog/posts');
        const result = await response.json();
        
        if (result.success) {
          setPosts(result.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadBlogPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Laatste Blog Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Laatste Blog Posts
          </h2>
          <div className="text-center text-gray-600">
            Er is een fout opgetreden bij het laden van de blog posts.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Laatste Blog Posts
        </h2>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {post.featured_image && (
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {post.categories && (
                      <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                        {post.categories.name}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(post.created_at).toLocaleDateString('nl-NL')}
                    </span>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                    >
                      Lees meer →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            Nog geen blog posts beschikbaar.
          </div>
        )}
      </div>
    </section>
  );
}
