import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get('path');
    const expiresIn = parseInt(searchParams.get('expires') || '3600'); // standaard 1 uur
    
    if (!imagePath) {
      return NextResponse.json({ error: 'Missing image path' }, { status: 400 });
    }

    // Genereer een signed URL die 1 uur geldig is
    const { data, error } = await supabase.storage
      .from('blog-images')
      .createSignedUrl(imagePath, expiresIn);

    if (error) {
      console.error('Error creating signed URL:', error);
      return NextResponse.json({ error: 'Failed to generate image URL' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      url: data.signedUrl,
      expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString()
    });

  } catch (error) {
    console.error('Image URL generation error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
