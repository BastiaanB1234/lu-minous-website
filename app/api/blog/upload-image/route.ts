import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

// Check if required environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Image upload route loaded with:');
console.log('supabaseUrl:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('supabaseServiceKey:', supabaseServiceKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables for image upload');
}

const supabase = createClient(
  supabaseUrl || 'https://wkbmfqkjutwshywgbjtn.supabase.co',
  supabaseServiceKey || 'fallback-key'
);

export async function POST(req: NextRequest) {
  try {
    console.log('Image upload request received');
    
    // Check if environment variables are available
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Environment variables missing:', { supabaseUrl, supabaseServiceKey });
      return NextResponse.json({ 
        error: 'Image upload service not configured properly' 
      }, { status: 500 });
    }

    const form = await req.formData();
    const file = form.get('file') as File;
    const slug = String(form.get('slug') || '').trim();

    console.log('Form data received:', { 
      hasFile: !!file, 
      fileName: file?.name, 
      fileSize: file?.size,
      slug 
    });

    if (!file || !slug) {
      return NextResponse.json({ error: 'Missing file or slug' }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${slug}-${timestamp}.${fileExtension}`;
    const filePath = `blog-images/${fileName}`;

    console.log('Attempting upload to:', filePath);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: true
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json({ 
        error: `Upload failed: ${uploadError.message}` 
      }, { status: 500 });
    }

    console.log('Upload successful, getting public URL');

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    console.log('Public URL generated:', urlData.publicUrl);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      path: filePath
    });

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json({
      error: 'Internal server error during upload'
    }, { status: 500 });
  }
}
