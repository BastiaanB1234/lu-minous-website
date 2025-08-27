import { NextResponse } from 'next/server';
import { getPublishedPosts, getFeaturedPosts } from '@/lib/blog-data';

// GET /api/blog/posts - Get all blog posts
export async function GET() {
  try {
    const posts = getPublishedPosts();
    
    return NextResponse.json({
      success: true,
      data: {
        posts,
        total: posts.length,
        featured: getFeaturedPosts()
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch blog posts',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
