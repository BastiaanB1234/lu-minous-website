import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET /api/admin/posts - Get all posts (admin view)
export async function GET() {
  try {
    const db = await getDatabase();
    const posts = await db.getAllPosts();
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/posts - Create new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, author, status, featured, published_at } = body;

    console.log('Received post data:', { title, slug, excerpt, content, author, status, featured, published_at });

    // Validation
    if (!title || !slug || !content || !author) {
      console.log('Validation failed: missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, content, author' },
        { status: 400 }
      );
    }

    console.log('Attempting to get database...');
    const db = await getDatabase();
    console.log('Database obtained, attempting to create post...');
    
    const postId = await db.createPost({
      title,
      slug,
      excerpt,
      content,
      author,
      status: status || 'draft',
      featured: featured || false,
      published_at: published_at || (status === 'published' ? new Date().toISOString() : undefined)
    });

    console.log('Post created successfully with ID:', postId);

    return NextResponse.json({ 
      message: 'Post created successfully',
      postId 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to create post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
