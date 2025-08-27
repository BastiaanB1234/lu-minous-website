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
{
    id: "936edc33-e92e-4d4d-ae0b-637c37a2b6e7",
    slug: "wijsheid-van-jean2181",
    title: "Wijsheid van Jean2181",
    excerpt: "From Heartbreak to Homecoming: The Journey Back to Myself  Have you ever been so broken that you swore you would never love again? That your heart became an iron vessel, safe, untouchable, but also...",
    content: `# Wijsheid van Jean2181\n\nFrom Heartbreak to Homecoming: The Journey Back to Myself\n\nHave you ever been so broken that you swore you would never love again?\nThat your heart became an iron vessel, safe, untouchable, but also locked away?\nI know that place. I have lived there.\nBut I also know this: heartbreak is not the end of your story.\nIt is the doorway to becoming more of who you truly are.\n\nThe Fall Into Darkness\n\nWhen I came out of my relationship, betrayed and shattered, I thought I would never trust again. My heart had built iron walls around itself, and I promised myself: Never again. Never again will I allow anyone this close. Never again will I give away my heart.\n\nBut life had other plans. My soul’s wisdom whispered: If you want to heal, you must go inward.\n\nSo I did.\n\nI turned toward the shadows I had ignored for so long. I asked myself hard questions:\nWhy didn’t the relationship work?\nWhat was my role in its unraveling?\nWhich of my own inner demons had I been running from?\n\nIt was painful, raw, and often lonely. Yet slowly, layer by layer, I began to meet myself again.\n\nReclaiming Myself\n\nAs I worked through my wounds, I began to see my own light. I started to recognize the woman I had been before life had dimmed me, the curious, radiant, light-filled version of me. She had always been there, waiting.\n\nI learned to hold myself. To admire myself. To trust myself again.\n\nFor a long time, I believed this was the end of the journey that healing meant being complete on my own, never needing anyone else. And for a moment, it was enough. I was whole, radiant, happy.\n\nBut then, my soul’s wisdom whispered again.\n\nThe Deeper Healing\n\nHealing, I discovered, is not just about standing strong alone. It is also about opening again allowing love to flow through the cracks in the walls we built.\n\nThe question came: Are you brave enough to open your heart again? Are you willing to set yourself free, to let someone truly see you, hold you, cherish you?\n\nI wrestled with that question. My head screamed, No, stay safe. But my intuition, my inner compass, whispered, Yes. Love is part of your path. Connection is sacred.\n\nAnd so, I chose courage. I chose openness.\n\nMeeting Him\n\nI still remember the day I rode out to meet him. My heart was bouncing in my chest, my head filled with doubts, my fears loud. Yet my intuition kept guiding me forward: Go. Meet him.\n\nAnd when I did, it was as if time stood still.\nIt wasn’t just meeting a man it was meeting a soul connection, a mirror, my partner for life.\nThe feeling was undeniable: This is home.\n\nHe didn’t just see me. He understood me.\nOur dreams aligned. Our hearts spoke the same language.\nIn him, I recognized not just love, but my homecoming.\n\nThis was where tantra entered my life, something I always wished that I would and could experience with someone, another person. not as something sexual alone, but as a way of connecting to life and love on the deepest level. Tantra taught me that intimacy is sacred, that to give and receive love is to honor the divine within ourselves and another.\n\nThe Sacred Claiming\n\nOur connection deepened into something far beyond what I had ever known. As a woman, I allowed myself to be loved, protected, admired, and honored in ways my soul had always longed for.\n\nAnd in the lifestyle we chose together in the sacred depth of BDSM came the moment that completed my journey: the day he claimed me.\n\nIt wasn’t about control or power for its own sake. It was about trust, surrender, and devotion. It was about letting myself be fully seen and fully held, knowing I was safe in his arms, safe in his lead, safe in his love.\n\nIn that claiming, I felt celebrated not diminished. Empowered not weakened. Free not bound.\n\nBecause true claiming is not about taking away freedom, it is about anchoring love in the deepest trust.\n\nThat was the moment I realized my healing had come full circle.\nI had faced my shadows, reclaimed my light, and found my strength.\nAnd then, from wholeness, I chose surrender.\n\n## Reflectie\n\nDeze wijsheid nodigt uit tot diepe reflectie en persoonlijke groei.`,
    author: "Lu Minous",
    publishedAt: "2025-08-27T12:36:52.352831",
    status: "published" as const,
    featured: false,
    createdAt: "2025-08-27T12:36:52.352824",
    updatedAt: "2025-08-27T12:36:52.352829",
    category: "Spiritual Growth",
    tags: ["Wijsheid", "Reflectie", "Persoonlijke Groei"],
    readTime: 4,
    viewCount: 0,
    imageUrl: "/images/blog/wijsheid-van-jean2181_20250827_123648__Wijsheid_van_Jean2181From_Hea.png"
  },

  // This will be populated by Lu Minous Bot when creating real posts
  // For now, we have an empty array to avoid 400 errors
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
