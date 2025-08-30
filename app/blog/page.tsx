import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock, Tag, FolderOpen } from 'lucide-react';
import { getBlogPosts, getCategories } from '@/lib/blog-database';
import { BlogPost, Category } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Lu Minous Blog',
  description: 'Discover spiritual wisdom, personal growth insights, and mindful reflections that inspire transformation and inner peace.',
};

export default async function BlogPage() {
  try {
    console.log('Starting to load blog page...');
    
    // Haal posts en categories parallel op uit de database
    const [posts, categories] = await Promise.all([
      getBlogPosts(),
      getCategories()
    ]);
    
    console.log('Posts loaded:', posts.length);
    console.log('Categories loaded:', categories.length);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Lu Minous Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover spiritual wisdom, personal growth insights, and mindful reflections that inspire transformation and inner peace.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">All Posts ({posts.length})</h2>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} categories={categories} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500">Check back soon for spiritual wisdom and insights.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog page:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Blog</h1>
          <p className="text-gray-600 mb-4">Er is een fout opgetreden bij het laden van de blog.</p>
          <pre className="text-sm text-red-600 bg-red-50 p-4 rounded overflow-auto max-w-md">
            {error instanceof Error ? error.message : 'Unknown error'}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Probeer opnieuw
          </button>
        </div>
      </div>
    );
  }
}

function PostCard({ post, categories }: { post: BlogPost; categories: Category[] }) {
  // Calculate read time (average reading speed: 200 words per minute)
  const readTime = Math.ceil((post.content?.length || 0) / 200);
  
  // Find category name by ID
  const category = categories.find(cat => cat.id === post.category_id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Featured Image */}
      {post.featured_image && (
        <div className="relative h-48">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>Lu Minous</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(post.created_at).toLocaleDateString('nl-NL')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{readTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Categories and Tags */}
        <div className="mb-4 space-y-2">
          {/* Category */}
          {category && (
            <div className="flex items-center">
              <FolderOpen className="h-3 w-3 mr-1 text-orange-500" />
              <span className="text-xs text-orange-600 font-medium">
                {category.name}
              </span>
            </div>
          )}
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-1">
              <Tag className="h-3 w-3 text-blue-500" />
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Read More
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
