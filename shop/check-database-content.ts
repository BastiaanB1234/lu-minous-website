import { PrismaClient } from '@prisma/client'

async function checkDatabaseContent() {
  console.log('🔍 Checking database content...')
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL
      }
    }
  })

  try {
    await prisma.$connect()
    console.log('✅ Connected to database')

    // Check categories
    console.log('\n📂 Checking categories...')
    const categories = await prisma.category.findMany({
      include: {
        products: true
      }
    })
    
    console.log(`Found ${categories.length} categories:`)
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (${cat.products.length} products)`)
    })

    // Check products
    console.log('\n🛍️ Checking products...')
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    })
    
    console.log(`Found ${products.length} products:`)
    products.forEach(prod => {
      console.log(`  - ${prod.name} (€${prod.price}) - Category: ${prod.category.name}`)
    })

    // Check featured products
    console.log('\n⭐ Checking featured products...')
    const featuredProducts = await prisma.product.findMany({
      where: { featured: true },
      include: { category: true }
    })
    
    console.log(`Found ${featuredProducts.length} featured products:`)
    featuredProducts.forEach(prod => {
      console.log(`  - ${prod.name} (€${prod.price})`)
    })

  } catch (error) {
    console.error('❌ Error checking database:', error)
  } finally {
    await prisma.$disconnect()
    console.log('\n🔌 Disconnected from database')
  }
}

checkDatabaseContent()
