import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://wkbmfqkjutwshywgbjtn.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrYm1mcWtqdXR3c2h5d2dianRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjU2Mjg2NCwiZXhwIjoyMDcyMTM4ODY0fQ.cub5Ve1EN7fAI3xBuLs_MiuP7-6Hn00LKENwq1tR9do';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function uploadImageToSupabase() {
  try {
    // Lees de afbeelding uit de public/images map
    const imagePath = path.join(process.cwd(), 'public', 'images', 'lu-minous-logo.jpg');
    const imageBuffer = fs.readFileSync(imagePath);
    
    console.log('📁 Afbeelding gelezen:', imagePath);
    console.log('📊 Bestandsgrootte:', (imageBuffer.length / 1024).toFixed(2), 'KB');

    // Upload naar Supabase Storage
    const fileName = `lu-minous-logo-${Date.now()}.jpg`;
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, imageBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (error) {
      console.error('❌ Upload fout:', error);
      return;
    }

    console.log('✅ Upload succesvol!');
    console.log('📁 Bestandspad:', data.path);

    // Haal de publieke URL op
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    console.log('🔗 Publieke URL:', urlData.publicUrl);

    // Update alle blog posts met deze afbeelding
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ featured_image: urlData.publicUrl })
      .eq('status', 'published');

    if (updateError) {
      console.error('❌ Database update fout:', updateError);
    } else {
      console.log('✅ Alle blog posts bijgewerkt met nieuwe afbeelding!');
    }

  } catch (error) {
    console.error('❌ Algemene fout:', error);
  }
}

// Voer het script uit
uploadImageToSupabase();
