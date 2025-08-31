const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wkbmfqkjutwshywgbjtn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrYm1mcWtqdXR3c2h5d2dianRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NjI4NjQsImV4cCI6MjA3MjEzODg2NH0._-Rmo8VHzUmFl50u2bJxfDECqFU3wPi0GZ7MZL3Jyog';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDatabase() {
  console.log('Testing database connection...');
  
  try {
    // Test blog_posts
    console.log('\n1. Testing blog_posts table...');
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(5);
    
    if (postsError) {
      console.error('❌ blog_posts error:', postsError);
    } else {
      console.log('✅ blog_posts success:', posts?.length || 0, 'posts found');
      if (posts && posts.length > 0) {
        console.log('Sample post:', {
          id: posts[0].id,
          title: posts[0].title,
          category_id: posts[0].category_id,
          tags: posts[0].tags
        });
      }
    }

    // Test categories
    console.log('\n2. Testing categories table...');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(5);
    
    if (categoriesError) {
      console.error('❌ categories error:', categoriesError);
    } else {
      console.log('✅ categories success:', categories?.length || 0, 'categories found');
      if (categories && categories.length > 0) {
        console.log('Sample category:', {
          id: categories[0].id,
          name: categories[0].name
        });
      }
    }

    // Test tags
    console.log('\n3. Testing tags table...');
    const { data: tags, error: tagsError } = await supabase
      .from('tags')
      .select('*')
      .limit(5);
    
    if (tagsError) {
      console.error('❌ tags error:', tagsError);
    } else {
      console.log('✅ tags success:', tags?.length || 0, 'tags found');
      if (tags && tags.length > 0) {
        console.log('Sample tag:', {
          id: tags[0].id,
          name: tags[0].name
        });
      }
    }

  } catch (error) {
    console.error('❌ General error:', error);
  }
}

testDatabase();
