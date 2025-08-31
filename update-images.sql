-- Update featured images for blog posts
UPDATE blog_posts 
SET featured_image = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop'
WHERE id = '9173ac40-00ad-4d58-b714-b5a4213be128';

UPDATE blog_posts 
SET featured_image = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
WHERE id = '636753c8-f87a-483d-a4bb-5f6f6f75aa69';

UPDATE blog_posts 
SET featured_image = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
WHERE id = 'eafce81e-3968-436c-8174-85fc06c595f6';

-- Verify the updates
SELECT id, title, featured_image FROM blog_posts WHERE status = 'published';
