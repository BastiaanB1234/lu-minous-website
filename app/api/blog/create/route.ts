import { NextRequest, NextResponse } from 'next/server';
import { BlogPost } from '../../../../lib/types';
import { blogAdminManager } from '../../../../lib/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, excerpt, content, author, category, tags, imageUrl } = body;
    
    if (!title || !excerpt || !content || !author) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: title, excerpt, content, author',
        timestamp: new Date().toISOString()
      }, { status: 400 });
    }

    // Create blog post data
    const postData: Partial<BlogPost> = {
      title,
      excerpt,
      content,
      author,
      category: category || 'spiritual-growth',
      tags: tags || ['wisdom', 'spiritual'],
      imageUrl,
      status: 'published',
      featured: false
    };

    // Use admin manager to create post
    const result = await blogAdminManager.createBlogPost(postData);

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 500 });
    }

  } catch (error) {
    console.error('Error creating blog post:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Use POST to create blog posts.',
    timestamp: new Date().toISOString()
  }, { status: 405 });
}
