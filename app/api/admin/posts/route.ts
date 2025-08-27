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

    // Validation
    if (!title || !slug || !content || !author) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, content, author' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
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

    return NextResponse.json({ 
      message: 'Post created successfully',
      postId 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
