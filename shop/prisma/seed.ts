import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.address.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  console.log('🧹 Cleared existing data')

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        id: 'nuts',
        name: 'Noten & Pinda\'s',
        slug: 'nuts',
        description: 'Premium kwaliteit noten en pinda\'s, vers gebrand en ongebrand',
        imageUrl: '/images/categories/nuts.jpg'
      }
    }),
    prisma.category.create({
      data: {
        id: 'dried-fruits',
        name: 'Zuidvruchten',
        slug: 'dried-fruits',
        description: 'Heerlijke gedroogde vruchten van over de hele wereld',
        imageUrl: '/images/categories/dried-fruits.jpg'
      }
    }),
    prisma.category.create({
      data: {
        id: 'seeds',
        name: 'Zaden, Pitten & Superfoods',
        slug: 'seeds',
        description: 'Gezonde zaden, pitten en superfoods voor een betere levensstijl',
        imageUrl: '/images/categories/seeds.jpg'
      }
    }),
    prisma.category.create({
      data: {
        id: 'snacks',
        name: 'Rijst Crackers & Zoutjes',
        slug: 'snacks',
        description: 'Lekkere en gezonde snacks voor tussendoor',
        imageUrl: '/images/categories/snacks.jpg'
      }
    }),
    prisma.category.create({
      data: {
        id: 'chocolate',
        name: 'Chocolade & Zoetwaren',
        slug: 'chocolate',
        description: 'Premium chocolade en zoetwaren van de beste kwaliteit',
        imageUrl: '/images/categories/chocolate.jpg'
      }
    }),
    prisma.category.create({
      data: {
        id: 'muesli',
        name: 'Muesli & Diversen',
        slug: 'muesli',
        description: 'Gezonde muesli en andere gezonde producten',
        imageUrl: '/images/categories/muesli.jpg'
      }
    })
  ])

  console.log('📂 Created categories')

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        id: 'almonds-blanched',
        name: 'Blanke Amandelen',
        slug: 'blanke-amandelen',
        description: 'Premium blanke amandelen, perfect voor bakken en koken. Deze amandelen zijn zorgvuldig geselecteerd op grootte en kwaliteit.',
        shortDescription: 'Premium blanke amandelen voor bakken en koken',
        price: 2.15,
        comparePrice: 2.50,
        stock: 100,
        weight: 250,
        categoryId: 'nuts',
        imageUrl: '/images/products/almonds-blanched.jpg',
        gallery: [
          '/images/products/almonds-blanched-1.jpg',
          '/images/products/almonds-blanched-2.jpg'
        ],
        tags: ['amandelen', 'noten', 'blank', 'premium'],
        featured: true,
        active: true
      }
    }),
    prisma.product.create({
      data: {
        id: 'cashews-raw',
        name: 'Cashewnoten Ongebrand',
        slug: 'cashewnoten-ongebrand',
        description: 'Heerlijke ongebrande cashewnoten, perfect voor salades, curry\'s of gewoon als gezonde snack. Rijk aan eiwitten en gezonde vetten.',
        shortDescription: 'Ongerbrande cashewnoten voor salades en curry\'s',
        price: 1.60,
        comparePrice: 1.95,
        stock: 150,
        weight: 250,
        categoryId: 'nuts',
        imageUrl: '/images/products/cashews-raw.jpg',
        gallery: [
          '/images/products/cashews-raw-1.jpg',
          '/images/products/cashews-raw-2.jpg'
        ],
        tags: ['cashewnoten', 'noten', 'ongebrand', 'gezond'],
        featured: true,
        active: true
      }
    }),
    prisma.product.create({
      data: {
        id: 'macadamias',
        name: 'Macadamia\'s',
        slug: 'macadamias',
        description: 'Premium macadamia noten uit Australië, bekend om hun romige smaak en delicate textuur. Perfect als luxe snack of in desserts.',
        shortDescription: 'Premium macadamia noten uit Australië',
        price: 3.20,
        comparePrice: 3.80,
        stock: 75,
        weight: 250,
        categoryId: 'nuts',
        imageUrl: '/images/products/macadamias.jpg',
        gallery: [
          '/images/products/macadamias-1.jpg',
          '/images/products/macadamias-2.jpg'
        ],
        tags: ['macadamia', 'noten', 'australië', 'luxe'],
        featured: true,
        active: true
      }
    }),
    prisma.product.create({
      data: {
        id: 'turkish-apricots',
        name: 'Turkse Abrikozen',
        slug: 'turkse-abrikozen',
        description: 'Zoete gedroogde abrikozen uit Turkije, rijk aan vezels en natuurlijke suikers. Perfect voor ontbijt, salades of als gezonde snack.',
        shortDescription: 'Zoete gedroogde abrikozen uit Turkije',
        price: 2.25,
        comparePrice: 2.60,
        stock: 200,
        weight: 250,
        categoryId: 'dried-fruits',
        imageUrl: '/images/products/turkish-apricots.jpg',
        gallery: [
          '/images/products/turkish-apricots-1.jpg',
          '/images/products/turkish-apricots-2.jpg'
        ],
        tags: ['abrikozen', 'zuidvruchten', 'turkije', 'gedroogd'],
        featured: true,
        active: true
      }
    }),
    prisma.product.create({
      data: {
        id: 'medjool-dates',
        name: 'Medjool Dadels',
        slug: 'medjool-dates',
        description: 'Grote sappige Medjool dadels uit Marokko, bekend om hun zoete smaak en zachte textuur. Perfect voor desserts, smoothies of als natuurlijke zoetstof.',
        shortDescription: 'Grote sappige Medjool dadels uit Marokko',
        price: 3.50,
        comparePrice: 4.00,
        stock: 100,
        weight: 500,
        categoryId: 'dried-fruits',
        imageUrl: '/images/products/medjool-dates.jpg',
        gallery: [
          '/images/products/medjool-dates-1.jpg',
          '/images/products/medjool-dates-2.jpg'
        ],
        tags: ['dadels', 'zuidvruchten', 'marokko', 'medjool'],
        featured: true,
        active: true
      }
    })
  ])

  console.log('🛍️ Created products')

  console.log('✅ Database seeding completed!')
  console.log(`📊 Created ${categories.length} categories and ${products.length} products`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
