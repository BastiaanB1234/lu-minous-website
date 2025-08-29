import { PrismaClient } from '@prisma/client'

// Server-side only Prisma client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database utility functions (server-side only)
export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true
      }
    })
    
    // Convert Prisma types to our interface types
    return categories.map(category => ({
      ...category,
      description: category.description,
      imageUrl: category.imageUrl,
      products: category.products.map(product => ({
        ...product,
        price: Number(product.price),
        comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
        weight: product.weight ? Number(product.weight) : null,
        shortDescription: product.shortDescription,
        imageUrl: product.imageUrl,
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          imageUrl: category.imageUrl,
          products: [], // Avoid circular reference
          createdAt: category.createdAt,
          updatedAt: category.updatedAt
        }
      }))
    }))
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
    
    // Convert Prisma types to our interface types
    return products.map(product => ({
      ...product,
      price: Number(product.price),
      comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
      weight: product.weight ? Number(product.weight) : null,
      shortDescription: product.shortDescription,
      imageUrl: product.imageUrl,
      category: {
        id: product.category.id,
        name: product.category.name,
        slug: product.category.slug,
        description: product.category.description,
        imageUrl: product.category.imageUrl,
        products: [], // Avoid circular reference
        createdAt: product.category.createdAt,
        updatedAt: product.category.updatedAt
      }
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true
      }
    })
    
    if (!product) return null
    
    // Convert Prisma types to our interface types
    return {
      ...product,
      price: Number(product.price),
      comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
      weight: product.weight ? Number(product.weight) : null,
      shortDescription: product.shortDescription,
      imageUrl: product.imageUrl,
      category: {
        id: product.category.id,
        name: product.category.name,
        slug: product.category.slug,
        description: product.category.description,
        imageUrl: product.category.imageUrl,
        products: [], // Avoid circular reference
        createdAt: product.category.createdAt,
        updatedAt: product.category.updatedAt
      }
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: true
      }
    })
    
    if (!category) return null
    
    // Convert Prisma types to our interface types
    return {
      ...category,
      description: category.description,
      imageUrl: category.imageUrl,
      products: category.products.map(product => ({
        ...product,
        price: Number(product.price),
        comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
        weight: product.weight ? Number(product.weight) : null,
        shortDescription: product.shortDescription,
        imageUrl: product.imageUrl,
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          imageUrl: category.imageUrl,
          products: [], // Avoid circular reference
          createdAt: category.createdAt,
          updatedAt: category.updatedAt
        }
      }))
    }
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}
