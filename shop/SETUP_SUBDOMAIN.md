# 🌐 **Subdomein Setup voor Lu Minous Webshop**

## 🎯 **Doel**
Een subdomein instellen voor je webshop (bijv. `shop.luminous.com` of `noten.luminous.com`)

## 📋 **Stap 1: Kies Je Subdomein**

**Opties:**
- `shop.luminous.com` - Algemene webshop
- `noten.luminous.com` - Specifiek voor noten
- `webshop.luminous.com` - Duidelijke webshop naam

**Aanbeveling:** `noten.luminous.com` (kort en duidelijk)

## 🔧 **Stap 2: DNS Configuratie**

### **Ga naar je DNS Provider:**
1. **Cloudflare** (als je dat gebruikt)
2. **GoDaddy, Namecheap, etc.**
3. **Je hosting provider**

### **Voeg deze DNS Record toe:**

```
Type: CNAME
Name: noten (of shop, webshop)
Value: luminous.com
TTL: Auto (of 300 seconden)
```

**Voorbeeld voor `noten.luminous.com`:**
```
Type: CNAME
Name: noten
Value: luminous.com
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
vercel domains add noten.luminous.com
```

### **3. DNS Verificatie:**
Vercel geeft je een TXT record om toe te voegen voor verificatie.

## 🌍 **Stap 4: Environment Variables**

Maak een `.env.local` bestand aan:

```env
NEXT_PUBLIC_SHOP_SUBDOMAIN=noten.luminous.com
NEXT_PUBLIC_MAIN_DOMAIN=luminous.com
```

## ✅ **Stap 5: Testen**

1. **Wacht 5-10 minuten** na DNS wijziging
2. **Test je subdomein:** `https://noten.luminous.com`
3. **Controleer redirects** naar `/shop`

## 🔍 **Troubleshooting**

### **DNS Propagatie:**
- DNS wijzigingen kunnen 24-48 uur duren
- Gebruik `nslookup noten.luminous.com` om te controleren

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

Na deze setup heb je een professionele webshop op je eigen subdomein!
