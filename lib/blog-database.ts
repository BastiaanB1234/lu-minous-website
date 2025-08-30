import { supabase } from './supabase';

export async function getBlogPosts(status: 'draft' | 'published' = 'published') {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    console.log('Fetched posts:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error);
    return null;
  }
}

export async function getBlogPostsByCategory(categorySlug: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .eq('category_id', categorySlug)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts by category:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getBlogPostsByCategory:', error);
    return [];
  }
}

export async function getBlogPostsByTag(tagSlug: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .contains('tags', [tagSlug])
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts by tag:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getBlogPostsByTag:', error);
    return [];
  }
}
