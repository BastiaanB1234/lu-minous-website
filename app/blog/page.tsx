import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'

// Sample blog data - later kunnen we dit uit markdown bestanden halen
const blogPosts = [
  {
    slug: 'spiritual-growth-journey',
    title: 'Your Spiritual Growth Journey: A Complete Guide',
    excerpt: 'Discover the essential steps to begin your spiritual transformation and unlock your inner potential.',
    author: 'Lu Minous',
    date: '2024-08-27',
    readTime: '5 min read',
    category: 'Spiritual Growth',
    featured: true
  },
  {
    slug: 'meditation-techniques',
    title: '5 Powerful Meditation Techniques for Beginners',
    excerpt: 'Learn simple yet effective meditation practices that will help you find inner peace and clarity.',
    author: 'Lu Minous',
    date: '2024-08-26',
    readTime: '4 min read',
    category: 'Meditation'
  },
  {
    slug: 'community-connection',
    title: 'Building Authentic Connections in Your Spiritual Community',
    excerpt: 'How to create meaningful relationships with like-minded souls on your spiritual journey.',
    author: 'Lu Minous',
    date: '2024-08-25',
    readTime: '6 min read',
    category: 'Community'
  },
  {
    slug: 'daily-spiritual-practices',
    title: 'Daily Spiritual Practices That Transform Your Life',
    excerpt: 'Simple daily rituals that will help you stay connected to your spiritual path.',
    author: 'Lu Minous',
    date: '2024-08-24',
    readTime: '7 min read',
    category: 'Daily Practice'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Lu Minous Blog
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Insights, wisdom, and guidance for your spiritual journey
            </p>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {blogPosts.filter(post => post.featured).map((post) => (
        <div key={post.slug} className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 mb-4">
                  {post.category}
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                  {post.title}
                </h2>
                <p className="text-lg leading-8 text-gray-600 mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
                >
                  Read Full Article
                </Link>
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                  <div className="text-blue-600 text-4xl font-bold">✨</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Blog Posts Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
          Latest Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 mb-4">
                  {post.category}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
