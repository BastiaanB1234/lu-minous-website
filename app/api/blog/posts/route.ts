import { NextResponse } from 'next/server'
import { getBlogDataService } from '@/lib/blog-data'

// GET /api/blog/posts - Get all blog posts
export async function GET() {
  try {
    const dataService = await getBlogDataService()
    const posts = await dataService.getAllPosts()
    
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
