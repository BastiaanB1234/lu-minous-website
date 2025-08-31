-- Update featured images for all blog posts with the local Lu Minous logo
UPDATE blog_posts 
SET featured_image = '/images/lu-minous-logo.jpg'
WHERE status = 'published';

-- Verify the updates
SELECT id, title, featured_image FROM blog_posts WHERE status = 'published';
