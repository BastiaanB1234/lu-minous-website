import { Product, Category } from './types';

// Sample Categories
export const sampleCategories: Category[] = [
  {
    id: 'nuts',
    name: 'Noten & Pinda\'s',
    slug: 'nuts',
    description: 'Premium kwaliteit noten en pinda\'s, vers gebrand en ongebrand',
    imageUrl: '/images/categories/nuts.jpg',
    products: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'dried-fruits',
    name: 'Zuidvruchten',
    slug: 'dried-fruits',
    description: 'Heerlijke gedroogde vruchten van over de hele wereld',
    imageUrl: '/images/categories/dried-fruits.jpg',
    products: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'seeds',
    name: 'Zaden, Pitten & Superfoods',
    slug: 'seeds',
    description: 'Gezonde zaden, pitten en superfoods voor een betere levensstijl',
    imageUrl: '/images/categories/seeds.jpg',
    products: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'snacks',
    name: 'Rijst Crackers & Zoutjes',
    slug: 'snacks',
    description: 'Lekkere en gezonde snacks voor tussendoor',
    imageUrl: '/images/categories/snacks.jpg',
    products: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'chocolate',
    name: 'Chocolade & Zoetwaren',
    slug: 'chocolate',
    description: 'Premium chocolade en zoetwaren van de beste kwaliteit',
    imageUrl: '/images/categories/chocolate.jpg',
    products: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'muesli',
    name: 'Muesli & Diversen',
    slug: 'muesli',
    description: 'Gezonde muesli en andere gezonde producten',
    imageUrl: '/images/categories/muesli.jpg',
    products: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Sample Products
export const sampleProducts: Product[] = [
  // Nuts Category
  {
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
    category: sampleCategories[0],
    imageUrl: '/images/products/almonds-blanched.jpg',
    gallery: [
      '/images/products/almonds-blanched-1.jpg',
      '/images/products/almonds-blanched-2.jpg'
    ],
    tags: ['amandelen', 'noten', 'blank', 'premium'],
    featured: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
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
    category: sampleCategories[0],
    imageUrl: '/images/products/cashews-raw.jpg',
    gallery: [
      '/images/products/cashews-raw-1.jpg',
      '/images/products/cashews-raw-2.jpg'
    ],
    tags: ['cashewnoten', 'noten', 'ongebrand', 'gezond'],
    featured: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'brazil-nuts',
    name: 'Paranoten',
    slug: 'paranoten',
    description: 'Grote, verse paranoten uit Brazilië. Rijk aan selenium en andere belangrijke mineralen. Perfect als gezonde snack.',
    shortDescription: 'Grote verse paranoten uit Brazilië',
    price: 0.95,
    comparePrice: 1.20,
    stock: 80,
    weight: 250,
    categoryId: 'nuts',
    category: sampleCategories[0],
    imageUrl: '/images/products/brazil-nuts.jpg',
    gallery: [
      '/images/products/brazil-nuts-1.jpg',
      '/images/products/brazil-nuts-2.jpg'
    ],
    tags: ['paranoten', 'noten', 'brazilië', 'selenium'],
    featured: false,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'hazelnuts',
    name: 'Hazelnoten',
    slug: 'hazelnoten',
    description: 'Verse hazelnoten, perfect voor bakken, chocolade of gewoon als snack. Rijk aan vitamine E en gezonde vetten.',
    shortDescription: 'Verse hazelnoten voor bakken en snacks',
    price: 2.10,
    comparePrice: 2.45,
    stock: 120,
    weight: 250,
    categoryId: 'nuts',
    category: sampleCategories[0],
    imageUrl: '/images/products/hazelnuts.jpg',
    gallery: [
      '/images/products/hazelnuts-1.jpg',
      '/images/products/hazelnuts-2.jpg'
    ],
    tags: ['hazelnoten', 'noten', 'bakken', 'vitamine-e'],
    featured: false,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'macadamia',
    name: 'Macadamia\'s',
    slug: 'macadamias',
    description: 'Premium macadamia noten uit Australië. Deze koning onder de noten is rijk aan gezonde vetten en heeft een heerlijke romige smaak.',
    shortDescription: 'Premium macadamia noten uit Australië',
    price: 3.20,
    comparePrice: 3.80,
    stock: 60,
    weight: 250,
    categoryId: 'nuts',
    category: sampleCategories[0],
    imageUrl: '/images/products/macadamia.jpg',
    gallery: [
      '/images/products/macadamia-1.jpg',
      '/images/products/macadamia-2.jpg'
    ],
    tags: ['macadamia', 'noten', 'australië', 'premium'],
    featured: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pecans',
    name: 'Pecannoten',
    slug: 'pecannoten',
    description: 'Heerlijke pecannoten uit de Verenigde Staten. Perfect voor taarten, koekjes of gewoon als gezonde snack.',
    shortDescription: 'Pecannoten uit de VS voor taarten en koekjes',
    price: 2.25,
    comparePrice: 2.60,
    stock: 90,
    weight: 250,
    categoryId: 'nuts',
    category: sampleCategories[0],
    imageUrl: '/images/products/pecans.jpg',
    gallery: [
      '/images/products/pecans-1.jpg',
      '/images/products/pecans-2.jpg'
    ],
    tags: ['pecannoten', 'noten', 'vs', 'bakken'],
    featured: false,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pistachios',
    name: 'Pistaches',
    slug: 'pistaches',
    description: 'Verse pistaches, perfect als snack of voor in salades. Deze groene noten zijn rijk aan eiwitten en vezels.',
    shortDescription: 'Verse pistaches voor snacks en salades',
    price: 1.80,
    comparePrice: 2.15,
    stock: 110,
    weight: 250,
    categoryId: 'nuts',
    category: sampleCategories[0],
    imageUrl: '/images/products/pistachios.jpg',
    gallery: [
      '/images/products/pistachios-1.jpg',
      '/images/products/pistachios-2.jpg'
    ],
    tags: ['pistaches', 'noten', 'snack', 'eiwitten'],
    featured: false,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'walnuts',
    name: 'Walnoten',
    slug: 'walnoten',
    description: 'Verse walnoten, rijk aan omega-3 vetzuren. Perfect voor salades, bakken of gewoon als gezonde snack.',
    shortDescription: 'Verse walnoten rijk aan omega-3',
    price: 1.60,
    comparePrice: 1.95,
    stock: 130,
    weight: 250,
    categoryId: 'nuts',
    category: sampleCategories[0],
    imageUrl: '/images/products/walnuts.jpg',
    gallery: [
      '/images/products/walnuts-1.jpg',
      '/images/products/walnuts-2.jpg'
    ],
    tags: ['walnoten', 'noten', 'omega-3', 'gezond'],
    featured: false,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Dried Fruits Category
  {
    id: 'apricots-turkish',
    name: 'Turkse Abrikozen',
    slug: 'turkse-abrikozen',
    description: 'Heerlijke gedroogde abrikozen uit Turkije. Zoet en sappig, perfect voor in muesli, salades of gewoon als snack.',
    shortDescription: 'Zoete gedroogde abrikozen uit Turkije',
    price: 2.25,
    comparePrice: 2.60,
    stock: 200,
    weight: 250,
    categoryId: 'dried-fruits',
    category: sampleCategories[1],
    imageUrl: '/images/products/apricots-turkish.jpg',
    gallery: [
      '/images/products/apricots-turkish-1.jpg',
      '/images/products/apricots-turkish-2.jpg'
    ],
    tags: ['abrikozen', 'zuidvruchten', 'turkije', 'zoet'],
    featured: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'dates-medjool',
    name: 'Medjool Dadels',
    slug: 'medjool-dadels',
    description: 'Grote, sappige Medjool dadels uit Marokko. Deze koning onder de dadels is perfect als natuurlijke zoetstof of snack.',
    shortDescription: 'Grote sappige Medjool dadels uit Marokko',
    price: 3.50,
    comparePrice: 4.00,
    stock: 150,
    weight: 500,
    categoryId: 'dried-fruits',
    category: sampleCategories[1],
    imageUrl: '/images/products/dates-medjool.jpg',
    gallery: [
      '/images/products/dates-medjool-1.jpg',
      '/images/products/dates-medjool-2.jpg'
    ],
    tags: ['dadels', 'zuidvruchten', 'marokko', 'natuurlijk-zoet'],
    featured: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'raisins-golden',
    name: 'Gouden Rozijnen',
    slug: 'gouden-rozijnen',
    description: 'Zoete gouden rozijnen, perfect voor in muesli, salades of gebak. Deze rozijnen zijn zorgvuldig geselecteerd op grootte en smaak.',
    shortDescription: 'Zoete gouden rozijnen voor muesli en gebak',
    price: 1.85,
    comparePrice: 2.20,
    stock: 180,
    weight: 250,
    categoryId: 'dried-fruits',
    category: sampleCategories[1],
    imageUrl: '/images/products/raisins-golden.jpg',
    gallery: [
      '/images/products/raisins-golden-1.jpg',
      '/images/products/raisins-golden-2.jpg'
    ],
    tags: ['rozijnen', 'zuidvruchten', 'gouden', 'zoet'],
    featured: false,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cranberries',
    name: 'Cranberries',
    slug: 'cranberries',
    description: 'Gedroogde cranberries, perfect voor in muesli, salades of gebak. Deze zure vruchten zijn rijk aan antioxidanten.',
    shortDescription: 'Gedroogde cranberries rijk aan antioxidanten',
    price: 2.40,
    comparePrice: 2.80,
    stock: 120,
    weight: 250,
    categoryId: 'dried-fruits',
    category: sampleCategories[1],
    imageUrl: '/images/products/cranberries.jpg',
    gallery: [
      '/images/products/cranberries-1.jpg',
      '/images/products/cranberries-2.jpg'
    ],
    tags: ['cranberries', 'zuidvruchten', 'antioxidanten', 'zuur'],
    featured: false,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Helper function to get products by category
export function getProductsByCategory(categorySlug: string): Product[] {
  return sampleProducts.filter(product => product.category.slug === categorySlug);
}

// Helper function to get featured products
export function getFeaturedProducts(): Product[] {
  return sampleProducts.filter(product => product.featured);
}

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return sampleProducts.find(product => product.slug === slug);
}

// Helper function to search products
export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return sampleProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
