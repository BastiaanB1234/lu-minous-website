// Lu Minous Website - Blog Data
// Clean, professional blog management system

import { BlogPost, BlogCategory, BlogTag } from './types';

// Blog Categories
export const blogCategories: BlogCategory[] = [
  {
    id: 'spiritual-growth',
    name: 'Spiritual Growth',
    slug: 'spiritual-growth',
    description: 'Personal development and spiritual insights',
    postCount: 0
  },
  {
    id: 'wisdom',
    name: 'Wisdom',
    slug: 'wisdom',
    description: 'Ancient and modern wisdom teachings',
    postCount: 0
  },
  {
    id: 'reflection',
    name: 'Reflection',
    slug: 'reflection',
    description: 'Deep thoughts and personal reflections',
    postCount: 0
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    slug: 'mindfulness',
    description: 'Present moment awareness and meditation',
    postCount: 0
  }
];

// Blog Tags
export const blogTags: BlogTag[] = [
  { id: 'spiritual', name: 'Spiritual', slug: 'spiritual', postCount: 0 },
  { id: 'growth', name: 'Growth', slug: 'growth', postCount: 0 },
  { id: 'wisdom', name: 'Wisdom', slug: 'wisdom', postCount: 0 },
  { id: 'reflection', name: 'Reflection', slug: 'reflection', postCount: 0 },
  { id: 'mindfulness', name: 'Mindfulness', slug: 'mindfulness', postCount: 0 },
  { id: 'meditation', name: 'Meditation', slug: 'meditation', postCount: 0 },
  { id: 'personal-development', name: 'Personal Development', slug: 'personal-development', postCount: 0 }
];

// Blog Posts - Clean, structured data
export const blogPosts: BlogPost[] = [
  // Example post structure - will be populated by Lu Minous Bot
  {
    id: 'example-post',
    title: 'Welcome to Lu Minous',
    excerpt: 'Discover spiritual wisdom and personal growth insights',
    content: '# Welcome to Lu Minous\n\nThis is where wisdom meets technology...',
    slug: 'welcome-to-lu-minous',
    author: 'Lu Minous',
    publishedAt: new Date().toISOString(),
    status: 'published',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: 'spiritual-growth',
    tags: ['spiritual', 'growth', 'welcome'],
    imageUrl: '/images/blog/welcome-to-lu-minous.png',
    readTime: 3,
    viewCount: 0
  }
];

// Utility functions for clean data management
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(categorySlug: string): BlogPost[] {
  return blogPosts.filter(post => post.category === categorySlug);
}

export function getBlogPostsByTag(tagSlug: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tagSlug));
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured && post.status === 'published');
}

export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.status === 'published');
}

export function updatePostCounts(): void {
  // Update category post counts
  blogCategories.forEach(category => {
    category.postCount = getBlogPostsByCategory(category.slug).length;
  });

  // Update tag post counts
  blogTags.forEach(tag => {
    tag.postCount = getBlogPostsByTag(tag.slug).length;
  });
}

// Initialize post counts
updatePostCounts();
