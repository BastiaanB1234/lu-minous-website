import Link from 'next/link'
import { Calendar, User, ArrowRight, Star } from 'lucide-react'
import { getDatabase } from '@/lib/database'

export default async function BlogPage() {
  try {
    const db = await getDatabase()
    const posts = await db.getPublishedPosts()

    // Get featured post (first published post)
    const featuredPost = posts.find(post => post.featured) || posts[0]
    const otherPosts = posts.filter(post => post.id !== featuredPost?.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Lu Minous Blog
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Discover insights, wisdom, and practical guidance for your spiritual journey
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Post</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    Featured
                  </span>
                  {featuredPost.featured && (
                    <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-700">
                      <Star className="h-4 w-4 mr-1" />
                      Starred
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                
                {featuredPost.excerpt && (
                  <p className="text-lg leading-8 text-gray-600 mb-6">
                    {featuredPost.excerpt}
                  </p>
                )}
                
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                                         <span>{new Date(featuredPost.published_at || featuredPost.created_at || '').toLocaleDateString('en-US', { 
                       year: 'numeric', 
                       month: 'long', 
                       day: 'numeric' 
                     })}</span>
                  </div>
                </div>
                
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors duration-200"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Latest Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    {post.featured && (
                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                                             <span>{new Date(post.published_at || post.created_at || '').toLocaleDateString('en-US', { 
                         month: 'short', 
                         day: 'numeric' 
                       })}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-600 mb-6">Be the first to share your wisdom with the community.</p>
            <Link
              href="/admin"
              className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors duration-200"
            >
              Create Your First Post
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
  } catch (error) {
    console.error('Error loading blog page:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Loading Error</h1>
          <p className="text-gray-600 mb-6">There was an error loading the blog. Please try again later.</p>
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }
}
