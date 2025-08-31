const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wkbmfqkjutwshywgbjtn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrYm1mcWtqdXR3c2h5d2dianRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NjI4NjQsImV4cCI6MjA3MjEzODg2NH0._-Rmo8VHzUmFl50u2bJxfDECqFU3wPi0GZ7MZL3Jyog';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateTags() {
  console.log('Updating blog posts with tags...');
  
  try {
    // Haal alle tags op
    const { data: tags, error: tagsError } = await supabase
      .from('tags')
      .select('*')
      .order('name');
    
    if (tagsError) {
      console.error('❌ Error fetching tags:', tagsError);
      return;
    }
    
    console.log('Available tags:', tags.map(t => t.name));
    
    // Haal alle posts op
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (postsError) {
      console.error('❌ Error fetching posts:', postsError);
      return;
    }
    
    console.log(`Found ${posts.length} posts to update`);
    
    // Update elke post met relevante tags
    for (const post of posts) {
      let tagsToAdd = [];
      
      // Voeg relevante tags toe op basis van titel en content
      const title = post.title.toLowerCase();
      const content = post.content.toLowerCase();
      
      if (title.includes('liefde') || content.includes('liefde') || title.includes('verbinding')) {
        tagsToAdd.push('liefde');
      }
      
      if (title.includes('groei') || content.includes('groei') || title.includes('ontwikkel')) {
        tagsToAdd.push('groei');
      }
      
      if (title.includes('spiritueel') || content.includes('spiritueel') || title.includes('innerlijk')) {
        tagsToAdd.push('spiritualiteit');
      }
      
      if (title.includes('relatie') || content.includes('relatie') || title.includes('verbinding')) {
        tagsToAdd.push('relaties');
      }
      
      if (title.includes('vrede') || content.includes('vrede') || title.includes('balans')) {
        tagsToAdd.push('innerlijke vrede');
      }
      
      // Verwijder duplicaten
      tagsToAdd = [...new Set(tagsToAdd)];
      
      if (tagsToAdd.length > 0) {
        console.log(`Updating post "${post.title}" with tags:`, tagsToAdd);
        
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({ tags: tagsToAdd })
          .eq('id', post.id);
        
        if (updateError) {
          console.error(`❌ Error updating post ${post.id}:`, updateError);
        } else {
          console.log(`✅ Updated post "${post.title}"`);
        }
      } else {
        console.log(`No relevant tags found for "${post.title}"`);
      }
    }
    
    console.log('\n🎉 Tag update completed!');
    
  } catch (error) {
    console.error('❌ General error:', error);
  }
}

updateTags();
