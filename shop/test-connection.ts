import { PrismaClient } from '@prisma/client'

async function testConnection() {
  console.log('🔍 Testing database connection...')
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL
      }
    }
  })

  try {
    // Test basic connection
    console.log('📡 Attempting to connect...')
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Test simple query
    console.log('🔍 Testing simple query...')
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Query test successful:', result)
    
    // Test database info
    console.log('📊 Getting database info...')
    const version = await prisma.$queryRaw`SELECT version()`
    console.log('✅ Database version:', version)
    
  } catch (error) {
    console.error('❌ Database connection failed:')
    console.error(error)
  } finally {
    await prisma.$disconnect()
    console.log('🔌 Connection closed')
  }
}

// Run the test
testConnection()
