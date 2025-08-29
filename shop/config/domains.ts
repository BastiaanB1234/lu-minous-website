// Subdomein configuratie voor webshop
export const domainConfig = {
  // Hoofddomein - Spirituele website
  mainDomain: process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'lu.minous.app',
  
  // Webshop subdomein - Alleen hier is de webshop beschikbaar
  shopSubdomain: process.env.NEXT_PUBLIC_SHOP_SUBDOMAIN || 'shop.minous.app',
  
  // Alternatieve subdomein opties
  alternativeSubdomains: [
    'noten.minous.app',
    'webshop.minous.app',
    'shop.minous.app'
  ],
  
  // URL generatie functies
  getShopUrl: (path: string = '') => {
    const baseUrl = `https://${domainConfig.shopSubdomain}`;
    return path ? `${baseUrl}${path.startsWith('/') ? path : `/${path}`}` : baseUrl;
  },
  
  getMainUrl: (path: string = '') => {
    const baseUrl = `https://${domainConfig.mainDomain}`;
    return path ? `${baseUrl}${path.startsWith('/') ? path : `/${path}`}` : baseUrl;
  },
  
  // Controleer of huidige domein webshop is
  isShopDomain: (hostname: string) => {
    return hostname === domainConfig.shopSubdomain;
  },
  
  // Controleer of huidige domein hoofdsite is
  isMainDomain: (hostname: string) => {
    return hostname === domainConfig.mainDomain || hostname === 'minous.app';
  }
};

// DNS configuratie instructies
export const dnsInstructions = {
  cnameRecord: {
    type: 'CNAME',
    name: 'shop', // of 'noten', 'webshop'
    value: 'minous.app',
    ttl: 'Auto (of 300 seconden)'
  },
  
  // Voor Vercel deployment
  vercelConfig: {
    domain: 'shop.minous.app',
    redirects: [
      {
        source: '/',
        destination: '/shop',
        permanent: true
      }
    ]
  }
};
