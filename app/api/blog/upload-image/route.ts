import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

// Check if required environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables for image upload');
}

const supabase = createClient(
  supabaseUrl || 'https://wkbmfqkjutwshywgbjtn.supabase.co',
  supabaseServiceKey || 'fallback-key'
);

export async function POST(req: NextRequest) {
  try {
    // Check if environment variables are available
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ 
        error: 'Image upload service not configured properly' 
      }, { status: 500 });
    }

    const form = await req.formData();
    const file = form.get('file') as File;
    const slug = String(form.get('slug') || '').trim();

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

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

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
