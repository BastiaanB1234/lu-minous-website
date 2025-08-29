import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database utility functions
export async function getCategories() {
  try {
    return await prisma.category.findMany({
      include: {
        products: true
      }
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getProducts(options?: {
  category?: string
  featured?: boolean
  limit?: number
}) {
  try {
    const where: any = {}
    
    if (options?.category) {
      where.categoryId = options.category
    }
    
    if (options?.featured !== undefined) {
      where.featured = options.featured
    }
    
    const products = await prisma.product.findMany({
      where,
      include: {
        category: true
      },
      take: options?.limit,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string) {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true
      }
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    return await prisma.category.findUnique({
      where: { slug },
      include: {
        products: true
      }
    })
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}
