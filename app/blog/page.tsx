import { Metadata } from 'next';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Star } from 'lucide-react';
import { getPublishedPosts, getFeaturedPosts } from '@/lib/blog-data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Lu Minous',
  description: 'Discover spiritual wisdom and personal growth insights',
};

export default async function BlogPage() {
  try {
    const posts = getPublishedPosts();
    const featuredPosts = getFeaturedPosts();

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Lu Minous Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover spiritual wisdom, personal growth insights, and mindful reflections 
              that inspire transformation and inner peace.
            </p>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Star className="h-6 w-6 text-yellow-500 mr-2" />
                Featured Posts
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <FeaturedPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">All Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
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
    );
  } catch (error) {
    console.error('Error loading blog page:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Blog</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
}

function FeaturedPostCard({ post }: { post: any }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {post.imageUrl && (
        <div className="relative h-64">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <User className="h-4 w-4 mr-1" />
          {post.author}
          <span className="mx-2">•</span>
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(post.publishedAt).toLocaleDateString()}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: any }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.imageUrl && (
        <div className="relative h-48">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <User className="h-4 w-4 mr-1" />
          {post.author}
          <span className="mx-2">•</span>
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(post.publishedAt).toLocaleDateString()}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
