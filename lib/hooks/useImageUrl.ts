import { useState, useEffect, useCallback } from 'react';

interface ImageUrlResponse {
  success: boolean;
  url: string;
  expiresAt: string;
}

export function useImageUrl(imagePath: string | null, expiresIn: number = 3600) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImageUrl = useCallback(async () => {
    if (!imagePath) {
      setImageUrl('');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/blog/image-url?path=${encodeURIComponent(imagePath)}&expires=${expiresIn}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch image URL');
      }

      const data: ImageUrlResponse = await response.json();
      
      if (data.success) {
        setImageUrl(data.url);
        
        // Automatisch vernieuwen 5 minuten voor expiratie
        const expiresAt = new Date(data.expiresAt).getTime();
        const now = Date.now();
        const timeUntilExpiry = expiresAt - now - (5 * 60 * 1000); // 5 minuten eerder
        
        if (timeUntilExpiry > 0) {
          setTimeout(() => {
            fetchImageUrl(); // Vernieuw de URL
          }, timeUntilExpiry);
        }
      } else {
        throw new Error('Failed to generate image URL');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching image URL:', err);
    } finally {
      setLoading(false);
    }
  }, [imagePath, expiresIn]);

  useEffect(() => {
    fetchImageUrl();
  }, [fetchImageUrl]);

  return {
    imageUrl,
    loading,
    error,
    refresh: fetchImageUrl
  };
}
