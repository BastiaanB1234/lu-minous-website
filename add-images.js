import { supabase } from './supabase';

async function addFeaturedImages() {
  const posts = [
    {
      id: '9173ac40-00ad-4d58-b714-b5a4213be128',
      title: 'De Kracht van Verbinding: Omarm Liefde en Veiligheid in Relaties',
      featured_image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop'
    },
    {
      id: '636753c8-f87a-483d-a4bb-5f6f6f75aa69',
      title: 'Spirituele Groei: De Reis naar Innerlijke Vrede',
      featured_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    },
    {
      id: 'eafce81e-3968-436c-8174-85fc06c595f6',
      title: 'Persoonlijke Groei: Omarm Verandering en Ontwikkel Je Potentieel',
      featured_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    }
  ];

  for (const post of posts) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ featured_image: post.featured_image })
        .eq('id', post.id)
        .select();

      if (error) {
        console.error(`Error updating post ${post.title}:`, error);
      } else {
        console.log(`✅ Updated featured image for: ${post.title}`);
      }
    } catch (error) {
      console.error(`Error updating post ${post.title}:`, error);
    }
  }
}

// Run the function
addFeaturedImages();
