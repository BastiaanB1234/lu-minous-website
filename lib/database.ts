import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Database interface
export interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  author: string;
  published_at?: string;
  status: 'draft' | 'published';
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id?: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id?: number;
  name: string;
  slug: string;
}

export interface PostTag {
  post_id: number;
  tag_id: number;
}

// Define the interface for database operations
interface IDatabaseOperations {
  getAllPosts(): Promise<BlogPost[]>;
  getPublishedPosts(): Promise<BlogPost[]>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<number>;
  updatePost(id: number, updates: Partial<BlogPost>): Promise<void>;
  deletePost(id: number): Promise<void>;
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getAllTags(): Promise<Tag[]>;
  getTagsForPost(postId: number): Promise<Tag[]>;
  addTagToPost(postId: number, tagId: number): Promise<void>;
  removeTagFromPost(postId: number, tagId: number): Promise<void>;
  close(): Promise<void>;
}

class BlogDatabase implements IDatabaseOperations {
  private db: Database | null = null;

  async initialize(): Promise<void> {
    try {
      this.db = await open({
        filename: './blog.db',
        driver: sqlite3.Database
      });

      // Create tables
      await this.createTables();
      console.log('✅ Database initialized successfully');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // Blog posts table
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        published_at TEXT,
        status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
        featured BOOLEAN DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Categories table
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT
      )
    `);

    // Tags table
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL
      )
    `);

    // Post-tag relationships table
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS post_tags (
        post_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        FOREIGN KEY (post_id) REFERENCES blog_posts (id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE,
        PRIMARY KEY (post_id, tag_id)
      )
    `);

    // Insert default categories
    await this.insertDefaultCategories();
    await this.insertDefaultTags();
    await this.insertSamplePosts();
  }

  private async insertDefaultCategories(): Promise<void> {
    if (!this.db) return;

    const categories = [
      { name: 'Spiritual Growth', slug: 'spiritual-growth', description: 'Personal development and spiritual practices' },
      { name: 'Meditation', slug: 'meditation', description: 'Meditation techniques and mindfulness' },
      { name: 'Wisdom', slug: 'wisdom', description: 'Ancient wisdom and modern insights' },
      { name: 'Community', slug: 'community', description: 'Building meaningful connections' }
    ];

          for (const category of categories) {
        try {
          await this.db.run(
            'INSERT OR IGNORE INTO categories (name, slug, description) VALUES (?, ?, ?)',
            [category.name, category.slug, category.description]
          );
        } catch {
          // Ignore duplicate key errors
        }
      }
  }

  private async insertDefaultTags(): Promise<void> {
    if (!this.db) return;

    const tags = [
      'Spiritual Growth', 'Self-Awareness', 'Daily Practices', 'Community',
      'Meditation', 'Beginners', 'Breath Awareness', 'Mindfulness',
      'Wisdom', 'Ancient Knowledge', 'Modern Life', 'Transformation'
    ];

          for (const tag of tags) {
        try {
          const slug = tag.toLowerCase().replace(/\s+/g, '-');
          await this.db.run(
            'INSERT OR IGNORE INTO tags (name, slug) VALUES (?, ?)',
            [tag, slug]
          );
        } catch {
          // Ignore duplicate key errors
        }
      }
  }

  private async insertSamplePosts(): Promise<void> {
    if (!this.db) return;

    const samplePosts = [
      {
        slug: 'spiritual-growth-journey',
        title: 'Your Spiritual Growth Journey: A Complete Guide',
        excerpt: 'Discover the essential steps to begin your spiritual transformation and unlock your inner potential.',
        content: 'Embarking on a spiritual growth journey is one of the most profound decisions you can make in your life...',
        author: 'Lu Minous',
        status: 'published' as const,
        featured: true
      },
      {
        slug: 'meditation-techniques',
        title: '5 Powerful Meditation Techniques for Beginners',
        excerpt: 'Learn simple yet effective meditation practices that will help you find inner peace and clarity.',
        content: 'Meditation is one of the most powerful tools for spiritual growth and inner peace...',
        author: 'Lu Minous',
        status: 'published' as const,
        featured: false
      }
    ];

          for (const post of samplePosts) {
        try {
          await this.db.run(
            `INSERT OR IGNORE INTO blog_posts 
             (slug, title, excerpt, content, author, status, featured, published_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [post.slug, post.title, post.excerpt, post.content, post.author, post.status, post.featured, new Date().toISOString()]
          );
        } catch {
          // Ignore duplicate key errors
        }
      }
  }

  // Blog post operations
  async getAllPosts(): Promise<BlogPost[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    const posts = await this.db.all('SELECT * FROM blog_posts ORDER BY created_at DESC');
    return posts.map((post: Record<string, unknown>) => ({
      ...post,
      featured: Boolean(post.featured)
    })) as BlogPost[];
  }

  async getPublishedPosts(): Promise<BlogPost[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    const posts = await this.db.all(
      'SELECT * FROM blog_posts WHERE status = ? ORDER BY created_at DESC',
      ['published']
    );
    return posts.map((post: Record<string, unknown>) => ({
      ...post,
      featured: Boolean(post.featured)
    })) as BlogPost[];
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!this.db) throw new Error('Database not initialized');
    
    const post = await this.db.get('SELECT * FROM blog_posts WHERE slug = ?', [slug]);
    if (!post) return null;
    
    return {
      ...post,
      featured: Boolean(post.featured)
    };
  }

  async createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');
    
    try {
      console.log('Executing SQL insert with data:', post);
      
      const result = await this.db.run(
        `INSERT INTO blog_posts (slug, title, excerpt, content, author, status, featured, published_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [post.slug, post.title, post.excerpt, post.content, post.author, post.status, post.featured, post.published_at]
      );
      
      console.log('SQL insert result:', result);
      
      if (!result.lastID) {
        throw new Error('No ID returned from insert operation');
      }
      
      return result.lastID;
    } catch (error) {
      console.error('Database insert error:', error);
      throw new Error(`Failed to insert post: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
  }

  async updatePost(id: number, updates: Partial<BlogPost>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    const fields = Object.keys(updates).filter(key => key !== 'id');
    const values = Object.values(updates).filter(value => value !== undefined);
    
    if (fields.length === 0) return;
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE blog_posts SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    
    await this.db.run(query, [...values, id]);
  }

  async deletePost(id: number): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    await this.db.run('DELETE FROM blog_posts WHERE id = ?', [id]);
  }

  // Category operations
  async getAllCategories(): Promise<Category[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    return await this.db.all('SELECT * FROM categories ORDER BY name');
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    if (!this.db) throw new Error('Database not initialized');
    
    const result = await this.db.get('SELECT * FROM categories WHERE slug = ?', [slug]);
    return result || null;
  }

  // Tag operations
  async getAllTags(): Promise<Tag[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    return await this.db.all('SELECT * FROM tags ORDER BY name');
  }

  async getTagsForPost(postId: number): Promise<Tag[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    return await this.db.all(`
      SELECT t.* FROM tags t
      JOIN post_tags pt ON t.id = pt.tag_id
      WHERE pt.post_id = ?
    `, [postId]);
  }

  async addTagToPost(postId: number, tagId: number): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    await this.db.run(
      'INSERT OR IGNORE INTO post_tags (post_id, tag_id) VALUES (?, ?)',
      [postId, tagId]
    );
  }

  async removeTagFromPost(postId: number, tagId: number): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    await this.db.run(
      'DELETE FROM post_tags WHERE post_id = ? AND tag_id = ?',
      [postId, tagId]
    );
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
    }
  }
}

// Singleton instance
let dbInstance: BlogDatabase | null = null;

// Mock database for development when SQLite fails
class MockDatabase implements IDatabaseOperations {
  async getAllPosts(): Promise<BlogPost[]> {
    return [];
  }
  
  async getPublishedPosts(): Promise<BlogPost[]> {
    return [];
  }
  
  async getPostBySlug(): Promise<BlogPost | null> {
    return null;
  }
  
  async createPost(): Promise<number> {
    return 0;
  }
  
  async updatePost(): Promise<void> {}
  
  async deletePost(): Promise<void> {}
  
  async getAllCategories(): Promise<Category[]> {
    return [];
  }
  
  async getCategoryBySlug(): Promise<Category | null> {
    return null;
  }
  
  async getAllTags(): Promise<Tag[]> {
    return [];
  }
  
  async getTagsForPost(): Promise<Tag[]> {
    return [];
  }
  
  async addTagToPost(): Promise<void> {}
  
  async removeTagFromPost(): Promise<void> {}
  
  async close(): Promise<void> {}
}

export async function getDatabase(): Promise<IDatabaseOperations> {
  try {
    if (!dbInstance) {
      dbInstance = new BlogDatabase();
      await dbInstance.initialize();
    }
    return dbInstance;
  } catch (error) {
    console.error('Database initialization failed:', error);
    console.log('Using mock database for development');
    return new MockDatabase();
  }
}

export async function closeDatabase(): Promise<void> {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
  }
}
