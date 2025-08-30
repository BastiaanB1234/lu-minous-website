// Lu Minous Website - Admin Management System
// Clean, professional admin interface for blog management

import { supabase } from './supabase';
import { BlogPost, Category, Tag, WebsiteStats } from './types';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

interface CreatePostData {
  title: string;
  excerpt?: string;
  content: string;
  status?: 'draft' | 'published';
  category_id?: string;
  tags?: string[];
  featured_image?: string;
}

export class AdminService {
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Blog Post Management
  async createBlogPost(postData: CreatePostData): Promise<ApiResponse<BlogPost>> {
    try {
      const newPost: Partial<BlogPost> = {
        title: postData.title,
        excerpt: postData.excerpt || '',
        content: postData.content,
        slug: this.generateSlug(postData.title),
        status: postData.status || 'draft',
        featured_image: postData.featured_image,
        category_id: postData.category_id,
        tags: postData.tags || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Save to Supabase
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([newPost])
        .select()
        .single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return {
        success: true,
        data: data as BlogPost,
        message: 'Blog post created successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  async updateBlogPost(postId: string, postData: Partial<CreatePostData>): Promise<ApiResponse<BlogPost>> {
    try {
      const updateData = {
        ...postData,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', postId)
        .select()
        .single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return {
        success: true,
        data: data as BlogPost,
        message: 'Blog post updated successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  async deleteBlogPost(postId: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return {
        success: true,
        message: 'Blog post deleted successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  // Category Management
  async createCategory(categoryData: Partial<Category>): Promise<ApiResponse<Category>> {
    try {
      const newCategory: Partial<Category> = {
        name: categoryData.name || '',
        slug: this.generateSlug(categoryData.name || ''),
        description: categoryData.description || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('categories')
        .insert([newCategory])
        .select()
        .single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return {
        success: true,
        data: data as Category,
        message: 'Category created successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  async updateCategory(categoryId: string, categoryData: Partial<Category>): Promise<ApiResponse<Category>> {
    try {
      const updateData = {
        ...categoryData,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('categories')
        .update(updateData)
        .eq('id', categoryId)
        .select()
        .single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return {
        success: true,
        data: data as Category,
        message: 'Category updated successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  async deleteCategory(categoryId: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return {
        success: true,
        message: 'Category deleted successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  // Tag Management
  async createTag(tagData: Partial<Tag>): Promise<ApiResponse<Tag>> {
    try {
      const newTag: Partial<Tag> = {
        name: tagData.name || '',
        slug: this.generateSlug(tagData.name || ''),
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('tags')
        .insert([newTag])
        .select()
        .single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return {
        success: true,
        data: data as Tag,
        message: 'Tag created successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  async updateTag(tagId: string, tagData: Partial<Tag>): Promise<ApiResponse<Tag>> {
    try {
      const { data, error } = await supabase
        .from('tags')
        .update(tagData)
        .eq('id', tagId)
        .select()
        .single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return {
        success: true,
        data: data as Tag,
        message: 'Tag updated successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  async deleteTag(tagId: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', tagId);

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return {
        success: true,
        message: 'Tag deleted successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  // Analytics
  async getWebsiteStats(): Promise<ApiResponse<WebsiteStats>> {
    try {
      // Get total post count
      const { count: postCount, error: postError } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true });

      if (postError) throw postError;

      // Get published post count
      const { count: publishedCount, error: publishedError } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published');

      if (publishedError) throw publishedError;

      // Get draft post count
      const { count: draftCount, error: draftError } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'draft');

      if (draftError) throw draftError;

      // Get category count
      const { count: categoryCount, error: categoryError } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true });

      if (categoryError) throw categoryError;

      // Get tag count
      const { count: tagCount, error: tagError } = await supabase
        .from('tags')
        .select('*', { count: 'exact', head: true });

      if (tagError) throw tagError;

      const stats: WebsiteStats = {
        totalPosts: postCount || 0,
        publishedPosts: publishedCount || 0,
        draftPosts: draftCount || 0,
        totalViews: 0, // Not implemented yet
        totalCategories: categoryCount || 0,
        totalTags: tagCount || 0,
        lastUpdated: new Date().toISOString()
      };

      return {
        success: true,
        data: stats,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }
}
