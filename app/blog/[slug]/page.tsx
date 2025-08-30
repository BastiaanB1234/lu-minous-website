import { Metadata } from 'next';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowLeft, Share2, Heart, MessageCircle } from 'lucide-react';
import { getBlogPostBySlug } from '@/lib/blog-database';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getBlogPostBySlug(params.slug);
    
    if (!post) {
      return {
        title: 'Post Not Found - Lu Minous',
      };
    }

    return {
      title: `${post.title} - Lu Minous`,
      description: post.excerpt || '',
      openGraph: {
        title: post.title,
        description: post.excerpt || '',
        images: post.featured_image ? [post.featured_image] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found - Lu Minous',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Featured Image */}
            {post.featured_image && (
              <div className="relative h-96">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="p-8">
              {/* Meta Information */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.authors?.name || 'Lu Minous'}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {Math.ceil((post.content?.length || 0) / 200)} min read
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag: { name: string; slug: string }) => (
                    <span
                      key={tag.name}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5 mr-2" />
                    Like
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Comment
                  </button>
                </div>
                <button className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
