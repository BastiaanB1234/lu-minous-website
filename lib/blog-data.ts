import blogPosts from '@/data/blog-posts.json'

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt?: string
  content: string
  author: string
  published_at?: string
  status: 'draft' | 'published'
  featured: boolean
  created_at: string
  updated_at: string
  category?: string
  tags?: string[]
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

// Blog data service using JSON files
export class BlogDataService {
  private posts: BlogPost[] = blogPosts

  // Get all posts
  async getAllPosts(): Promise<BlogPost[]> {
    return this.posts.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }

  // Get published posts only
  async getPublishedPosts(): Promise<BlogPost[]> {
    return this.posts
      .filter(post => post.status === 'published')
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
  }

  // Get post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    return this.posts.find(post => post.slug === slug) || null
  }

  // Get featured posts
  async getFeaturedPosts(): Promise<BlogPost[]> {
    return this.posts
      .filter(post => post.featured && post.status === 'published')
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
  }

  // Get posts by category
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    return this.posts
      .filter(post => post.category === category && post.status === 'published')
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
  }

  // Get posts by tag
  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    return this.posts
      .filter(post => post.tags?.includes(tag) && post.status === 'published')
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
  }

  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    const categories = new Map<string, { count: number, name: string }>()
    
    this.posts.forEach(post => {
      if (post.category && post.status === 'published') {
        const existing = categories.get(post.category)
        if (existing) {
          existing.count++
        } else {
          categories.set(post.category, { count: 1, name: post.category })
        }
      }
    })

    return Array.from(categories.entries()).map(([slug, { count, name }]) => ({
      id: slug.length, // Simple ID generation
      name,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      description: `${count} posts`
    }))
  }

  // Get all tags
  async getAllTags(): Promise<Tag[]> {
    const tags = new Map<string, { count: number, name: string }>()
    
    this.posts.forEach(post => {
      if (post.tags && post.status === 'published') {
        post.tags.forEach(tag => {
          const existing = tags.get(tag)
          if (existing) {
            existing.count++
          } else {
            tags.set(tag, { count: 1, name: tag })
          }
        })
      }
    })

    return Array.from(tags.entries()).map(([slug, { count, name }]) => ({
      id: slug.length, // Simple ID generation
      name,
      slug: slug.toLowerCase().replace(/\s+/g, '-')
    }))
  }

  // Search posts
  async searchPosts(query: string): Promise<BlogPost[]> {
    const lowercaseQuery = query.toLowerCase()
    
    return this.posts
      .filter(post => 
        post.status === 'published' && (
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.excerpt?.toLowerCase().includes(lowercaseQuery) ||
          post.content.toLowerCase().includes(lowercaseQuery) ||
          post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        )
      )
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
  }

  // Get recent posts
  async getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
    return this.posts
      .filter(post => post.status === 'published')
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
      .slice(0, limit)
  }

  // Get related posts (by category or tags)
  async getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
    const related = this.posts
      .filter(post => 
        post.id !== currentPost.id && 
        post.status === 'published' && (
          post.category === currentPost.category ||
          post.tags?.some(tag => currentPost.tags?.includes(tag))
        )
      )
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
      .slice(0, limit)

    return related
  }
}

// Singleton instance
let dataServiceInstance: BlogDataService | null = null

export async function getBlogDataService(): Promise<BlogDataService> {
  if (!dataServiceInstance) {
    dataServiceInstance = new BlogDataService()
  }
  return dataServiceInstance
}
