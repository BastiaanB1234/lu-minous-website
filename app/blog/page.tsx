import { Metadata } from 'next';
import { getBlogPosts, getCategories } from '@/lib/blog-database';
import BlogPageClient from '@/components/BlogPageClient';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Lu Minous Blog',
  description: 'Discover spiritual wisdom, personal growth insights, and mindful reflections that inspire transformation and inner peace.',
};

export default async function BlogPage() {
  try {
    console.log('Starting to load blog page...');

    // Haal posts en categories parallel op uit de database
    const [posts, categories] = await Promise.all([
      getBlogPosts('published'), // Only fetch published posts
      getCategories()
    ]);

    console.log('Published posts loaded:', posts.length);
    console.log('Categories loaded:', categories.length);

    return <BlogPageClient initialPosts={posts} categories={categories} />;
    
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
