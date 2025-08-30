// Lu Minous Website - Type Definitions
// Clean, professional structure for blog management

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  published_at?: string
  created_at: string
  updated_at: string
  status: 'draft' | 'published'
  author_id?: string
  category_id?: string
  featured?: boolean
  tags?: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Author {
  id: string
  name: string
  email?: string
  bio?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface WebsiteStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalViews: number
  totalCategories: number
  totalTags: number
  lastUpdated: string
}

export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  created_at: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: string
}

export interface CreatePostData {
  title: string
  excerpt?: string
  content: string
  status?: 'draft' | 'published'
  featured_image?: string
  category_id?: string
  tags?: string[]
}
