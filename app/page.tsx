import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import BlogPosts from '@/components/sections/BlogPosts'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BlogPosts />
      <Footer />
    </main>
  )
}
