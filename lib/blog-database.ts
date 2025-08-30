import { supabase } from './supabase'
import { BlogPost, Category, Tag, Author } from './types'

// Blog Posts
export async function getBlogPosts(status: 'draft' | 'published' = 'published') {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      categories(name, slug),
      tags(name, slug),
      authors(name, bio, avatar_url)
    `)
    .eq('status', status)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      categories(name, slug),
      tags(name, slug),
      authors(name, bio, avatar_url)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) throw error
  return data
}

export async function getFeaturedPosts(limit: number = 3) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      categories(name, slug),
      tags(name, slug)
    `)
    .eq('status', 'published')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

// Categories
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

// Tags
export async function getTags() {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

// Search
export async function searchBlogPosts(query: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      categories(name, slug),
      tags(name, slug)
    `)
    .textSearch('title', query)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
