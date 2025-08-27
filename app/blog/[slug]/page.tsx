import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, Share2, Heart, MessageCircle } from 'lucide-react'

// Sample blog data - later kunnen we dit uit markdown bestanden halen
const blogPosts = [
  {
    slug: 'spiritual-growth-journey',
    title: 'Your Spiritual Growth Journey: A Complete Guide',
    excerpt: 'Discover the essential steps to begin your spiritual transformation and unlock your inner potential.',
    content: `
      <p class="mb-6 text-lg leading-8 text-gray-700">
        Embarking on a spiritual growth journey is one of the most profound decisions you can make in your life. 
        It&apos;s a path that leads to deeper self-awareness, inner peace, and a connection to something greater than yourself.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Understanding Spiritual Growth</h2>
      <p class="mb-6 text-lg leading-8 text-gray-700">
        Spiritual growth is not about following a specific religion or belief system. Instead, it&apos;s about developing 
        your inner wisdom, expanding your consciousness, and aligning with your authentic self. It&apos;s a journey of 
        self-discovery that can transform every aspect of your life.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">The Foundation: Self-Awareness</h2>
      <p class="mb-6 text-lg leading-8 text-gray-700">
        The first step in any spiritual journey is developing self-awareness. This means taking time to reflect on 
        your thoughts, emotions, and behaviors. It&apos;s about understanding your patterns, triggers, and the stories 
        you tell yourself about who you are.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Daily Practices for Growth</h2>
      <p class="mb-6 text-lg leading-8 text-gray-700">
        Consistency is key in spiritual growth. Here are some daily practices that can support your journey:
      </p>
      
      <ul class="list-disc list-inside mb-6 text-lg leading-8 text-gray-700 space-y-2">
        <li><strong>Morning Reflection:</strong> Start each day with 10-15 minutes of quiet reflection</li>
        <li><strong>Mindful Breathing:</strong> Practice conscious breathing throughout the day</li>
        <li><strong>Gratitude Practice:</strong> Write down three things you&apos;re grateful for each day</li>
        <li><strong>Nature Connection:</strong> Spend time in nature to ground yourself</li>
        <li><strong>Evening Review:</strong> Reflect on your day and what you learned</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Overcoming Common Challenges</h2>
      <p class="mb-6 text-lg leading-8 text-gray-700">
        Every spiritual journey comes with challenges. You might experience doubt, resistance, or periods where 
        you feel stuck. Remember that these are normal and often indicate that you&apos;re on the right path. 
        Growth happens in cycles, not in a straight line.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Building Your Spiritual Community</h2>
      <p class="mb-6 text-lg leading-8 text-gray-700">
        While spiritual growth is deeply personal, having a supportive community can make a significant difference. 
        Connect with like-minded individuals who are also on their spiritual journey. Share your experiences, 
        learn from others, and support each other through the ups and downs.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Measuring Your Progress</h2>
      <p class="mb-6 text-lg leading-8 text-gray-700">
        Spiritual growth isn&apos;t always easy to measure, but there are signs that indicate you&apos;re moving forward:
      </p>
      
      <ul class="list-disc list-inside mb-6 text-lg leading-8 text-gray-700 space-y-2">
        <li>Increased inner peace and calmness</li>
        <li>Better emotional regulation</li>
        <li>Deeper sense of purpose and meaning</li>
        <li>Improved relationships with others</li>
        <li>Greater compassion and empathy</li>
        <li>Enhanced intuition and inner knowing</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">The Journey Continues</h2>
      <p class="mb-6 text-lg leading-8 text-gray-700">
        Remember that spiritual growth is a lifelong journey, not a destination. There&apos;s no finish line to cross 
        or final level to achieve. Instead, it&apos;s about continuous evolution, learning, and deepening your 
        connection to your authentic self and the world around you.
      </p>
      
      <p class="mb-6 text-lg leading-8 text-gray-700">
        As you continue on your path, be patient with yourself. Trust the process and know that every step, 
        no matter how small, is moving you forward. Your spiritual journey is unique to you, and there&apos;s no 
        right or wrong way to proceed.
      </p>
    `,
    author: 'Lu Minous',
    date: '2024-08-27',
    readTime: '5 min read',
    category: 'Spiritual Growth',
    tags: ['Spiritual Growth', 'Self-Awareness', 'Daily Practices', 'Community']
  },
  {
    slug: 'meditation-techniques',
    title: '5 Powerful Meditation Techniques for Beginners',
    excerpt: 'Learn simple yet effective meditation practices that will help you find inner peace and clarity.',
    content: `
      <p class="mb-6 text-lg leading-8 text-gray-700">
        Meditation is one of the most powerful tools for spiritual growth and inner peace. Whether you&apos;re a 
        complete beginner or have some experience, these five techniques will help you establish a consistent 
        meditation practice.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">1. Breath Awareness Meditation</h2>
      <p class="mb-6 text-lg leading-8 text-gray-700">
        This is the foundation of all meditation practices. Simply focus your attention on your breath, 
        observing the natural rhythm of inhalation and exhalation. When your mind wanders, gently bring 
        it back to your breath.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Body Scan Meditation</h2>
      <p class="mb-6 text-lg leading-8 text-gray-700">
        Lie down comfortably and bring your awareness to different parts of your body, starting from your 
        toes and moving up to your head. This practice helps you develop body awareness and release tension.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">3. Loving-Kindness Meditation</h2>
      <p class="mb-6 text-lg leading-8 text-gray-700">
        This practice involves sending love, compassion, and well-wishes to yourself and others. It&apos;s a 
        powerful way to cultivate positive emotions and develop empathy.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">4. Walking Meditation</h2>
      <p class="mb-6 text-lg leading-8 text-gray-700">
        For those who find sitting meditation challenging, walking meditation can be a great alternative. 
        Walk slowly and mindfully, paying attention to each step and the sensations in your body.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">5. Mantra Meditation</h2>
      <p class="mb-6 text-lg leading-8 text-gray-700">
        Choose a word or phrase that resonates with you and repeat it silently or aloud. This helps focus 
        the mind and can have a calming effect on your nervous system.
      </p>
    `,
    author: 'Lu Minous',
    date: '2024-08-26',
    readTime: '4 min read',
    category: 'Meditation',
    tags: ['Meditation', 'Beginners', 'Breath Awareness', 'Mindfulness']
  }
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back to Blog */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-6 py-4 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
          <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 mb-6">
            {post.category}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            {post.title}
          </h1>
          <p className="text-xl leading-8 text-gray-600 mb-8">
            {post.excerpt}
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
          <article 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Article Actions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                  <MessageCircle className="h-5 w-5" />
                  <span>Comment</span>
                </button>
              </div>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
