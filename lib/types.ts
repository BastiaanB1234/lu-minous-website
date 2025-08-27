// Lu Minous Website - Type Definitions
// Clean, professional structure for blog management

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  author: string;
  publishedAt: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  readTime: number;
  viewCount: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface WebsiteStats {
  totalPosts: number;
  totalViews: number;
  totalCategories: number;
  totalTags: number;
  lastUpdated: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLogin: string;
  permissions: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}
