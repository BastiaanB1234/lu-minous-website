# 🏪 Lu Minous Webshop - Nuts & Dried Fruits

Een moderne, volledig functionele webshop voor premium noten en zuidvruchten, gebouwd met Next.js 15, TypeScript en Tailwind CSS.

## 🚀 Features

### **Frontend**
- **Moderne UI/UX** met Tailwind CSS en Framer Motion
- **Responsive design** voor alle apparaten
- **Product catalogus** met filters en zoekfunctie
- **Winkelwagen** met localStorage persistence
- **Product categorieën** en tags
- **Featured products** sectie

### **Backend (Ready for Database)**
- **Prisma ORM** schema voor PostgreSQL
- **TypeScript types** voor alle data modellen
- **API routes** structuur (klaar voor implementatie)
- **Database schema** voor producten, klanten en bestellingen

### **Functionaliteit**
- ✅ Product overzicht en details
- ✅ Winkelwagen management
- ✅ Categorie filters
- ✅ Zoekfunctie
- ✅ Responsive navigation
- ✅ Cart persistence
- 🔄 Database integratie (klaar voor implementatie)
- 🔄 Checkout proces (klaar voor implementatie)
- 🔄 Payment integratie (klaar voor implementatie)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: Prisma ORM + PostgreSQL (Vercel Postgres)
- **State Management**: React hooks + localStorage
- **Icons**: Lucide React
- **Deployment**: Vercel (klaar voor setup)

## 📁 Project Structuur

```
shop/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Homepage
│   ├── products/page.tsx        # Producten overzicht
│   └── cart/page.tsx            # Winkelwagen
├── components/                   # React componenten
│   ├── layout/                  # Header, Footer, Navigation
│   ├── sections/                # Homepage secties
│   ├── products/                # Product componenten
│   └── cart/                    # Winkelwagen componenten
├── lib/                         # Utilities en hooks
│   ├── types.ts                 # TypeScript types
│   ├── hooks/                   # Custom React hooks
│   └── sample-data.ts           # Voorbeeldproducten
└── prisma/                      # Database schema
    └── schema.prisma            # Prisma database schema
```

## 🚀 Setup & Development

### **1. Dependencies Installeren**
```bash
cd lu-minous-website
npm install
```

### **2. Development Server Starten**
```bash
npm run dev
```

De webshop is beschikbaar op: `http://localhost:3000/shop`

### **3. Database Setup (Optioneel)**
```bash
# Prisma client genereren
cd shop
npx prisma generate

# Database migratie (wanneer je een echte database hebt)
npx prisma db push
```

## 🎨 Design Features

### **Kleurenschema**
- **Primary**: Orange-600 (#ea580c) tot Red-600 (#dc2626)
- **Background**: Gray-50 (#f9fafb) tot White (#ffffff)
- **Text**: Gray-900 (#111827) tot Gray-600 (#4b5563)

### **Componenten**
- **Product Cards**: Hover effects, badges, quick actions
- **Navigation**: Sticky header, dropdown menus, mobile responsive
- **Winkelwagen**: Real-time updates, quantity controls, summary
- **Filters**: Categorieën, prijsbereik, tags, sortering

## 📱 Responsive Design

- **Mobile First** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interface
- **Optimized** voor alle schermformaten

## 🔄 Volgende Stappen

### **Database Integratie**
1. **Vercel Postgres** setup in dashboard
2. **Environment variables** configureren
3. **Prisma client** genereren
4. **API routes** implementeren

### **Checkout Proces**
1. **Klant registratie** en login
2. **Adres management**
3. **Bestelling** verwerking
4. **Email confirmations**

### **Payment Integratie**
1. **Stripe** setup
2. **Payment forms**
3. **Order management**
4. **Invoice generatie**

## 🧪 Testen

### **Frontend Testen**
- Product navigatie
- Winkelwagen functionaliteit
- Responsive design
- Filter functionaliteit

### **Database Testen** (wanneer geïmplementeerd)
- Product CRUD operaties
- Order management
- Customer data
- Inventory tracking

## 📊 Performance

- **Lazy loading** voor producten
- **Image optimization** met Next.js
- **Code splitting** per route
- **Optimized bundles** met Turbopack

## 🚀 Deployment

### **Vercel Deployment**
1. **Repository** koppelen aan Vercel
2. **Environment variables** instellen
3. **Database** koppelen (Vercel Postgres)
4. **Auto-deploy** bij Git pushes

### **Custom Domain**
- **Subdomain**: `shop.lu.minous.app`
- **SSL certificaat** automatisch
- **CDN** wereldwijd

## 🤝 Bijdragen

1. **Fork** het project
2. **Feature branch** aanmaken (`git checkout -b feature/AmazingFeature`)
3. **Commit** je wijzigingen (`git commit -m 'Add some AmazingFeature'`)
4. **Push** naar de branch (`git push origin feature/AmazingFeature`)
5. **Pull Request** openen

## 📄 Licentie

Dit project is onderdeel van de Lu Minous website en is eigendom van Bastiaan Beemsterboer.

## 📞 Contact

- **Website**: [lu.minous.app](https://lu.minous.app)
- **Email**: [contact@lu.minous.app](mailto:contact@lu.minous.app)
- **GitHub**: [@BastiaanB1234](https://github.com/BastiaanB1234)

---

**Gebouwd met ❤️ door Bastiaan Beemsterboer**
