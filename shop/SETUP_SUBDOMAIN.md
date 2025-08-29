# 🌐 **Subdomein Setup voor Lu Minous Webshop**

## 🎯 **Doel**
Een subdomein instellen voor je webshop (`shop.minous.app`) terwijl je hoofdsite (`lu.minous.app`) de originele spirituele website behoudt.

## 📋 **Stap 1: Kies Je Subdomein**

**Opties:**
- `shop.minous.app` - Algemene webshop ⭐ **Aanbevolen**
- `noten.minous.app` - Specifiek voor noten
- `webshop.minous.app` - Duidelijke webshop naam

**Aanbeveling:** `shop.minous.app` (kort en duidelijk)

## 🔧 **Stap 2: DNS Configuratie**

### **Ga naar je DNS Provider:**
1. **Cloudflare** (als je dat gebruikt)
2. **GoDaddy, Namecheap, etc.**
3. **Je hosting provider**

### **Voeg deze DNS Record toe:**

```
Type: CNAME
Name: shop (of noten, webshop)
Value: minous.app
TTL: Auto (of 300 seconden)
```

**Voorbeeld voor `shop.minous.app`:**
```
Type: CNAME
Name: shop
Value: minous.app
TTL: Auto
```

## 🚀 **Stap 3: Vercel Deployment (Aanbevolen)**

### **1. Vercel Project Aanmaken:**
```bash
# Installeer Vercel CLI
npm i -g vercel

# Login en project aanmaken
vercel login
vercel
```

### **2. Domein Koppelen:**
```bash
vercel domains add shop.minous.app
```

### **3. DNS Verificatie:**
Vercel geeft je een TXT record om toe te voegen voor verificatie.

## 🌍 **Stap 4: Environment Variables**

Maak een `.env.local` bestand aan:

```env
NEXT_PUBLIC_SHOP_SUBDOMAIN=shop.minous.app
NEXT_PUBLIC_MAIN_DOMAIN=lu.minous.app
```

## ✅ **Stap 5: Testen**

1. **Wacht 5-10 minuten** na DNS wijziging
2. **Test je subdomein:** `https://shop.minous.app`
3. **Controleer dat hoofdsite intact blijft:** `https://lu.minous.app`

## 🔍 **Hoe Het Werkt**

**Na deze setup:**
- `lu.minous.app` → **Spirituele website** (origineel)
- `shop.minous.app` → **Webshop** (nieuw)
- `minous.app` → **Spirituele website** (origineel)

**De webshop is alleen beschikbaar op het subdomein, niet op de hoofdsite.**

## 🔍 **Troubleshooting**

### **DNS Propagatie:**
- DNS wijzigingen kunnen 24-48 uur duren
- Gebruik `nslookup shop.minous.app` om te controleren

### **Vercel Issues:**
- Controleer of je domein is geverifieerd
- Zorg dat je Vercel project is gekoppeld

### **SSL Certificaat:**
- Vercel regelt automatisch SSL certificaten
- Controleer of HTTPS werkt

## 📞 **Hulp Nodig?**

Als je problemen ondervindt:
1. **Controleer DNS records** in je provider
2. **Wacht op propagatie** (kan 24-48 uur duren)
3. **Test met verschillende tools** (nslookup, dig, online DNS checkers)

## 🎉 **Succes!**

Na deze setup heb je:
- **Spirituele website** op `lu.minous.app` ✅
- **Webshop** op `shop.minous.app` ✅
- **Gescheiden functionaliteiten** zonder conflicten ✅
