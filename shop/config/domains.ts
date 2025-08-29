// Subdomein configuratie voor webshop
export const domainConfig = {
  // Hoofddomein
  mainDomain: process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'luminous.com',
  
  // Webshop subdomein
  shopSubdomain: process.env.NEXT_PUBLIC_SHOP_SUBDOMAIN || 'shop.luminous.com',
  
  // Alternatieve subdomein opties
  alternativeSubdomains: [
    'noten.luminous.com',
    'webshop.luminous.com',
    'shop.luminous.com'
  ],
  
  // URL generatie functies
  getShopUrl: (path: string = '') => {
    const baseUrl = `https://${domainConfig.shopSubdomain}`;
    return path ? `${baseUrl}${path.startsWith('/') ? path : `/${path}`}` : baseUrl;
  },
  
  getMainUrl: (path: string = '') => {
    const baseUrl = `https://${domainConfig.mainDomain}`;
    return path ? `${baseUrl}${path.startsWith('/') ? path : `/${path}`}` : baseUrl;
  }
};

// DNS configuratie instructies
export const dnsInstructions = {
  cnameRecord: {
    type: 'CNAME',
    name: 'shop', // of 'noten', 'webshop'
    value: 'luminous.com',
    ttl: 'Auto (of 300 seconden)'
  },
  
  // Voor Vercel deployment
  vercelConfig: {
    domain: 'shop.luminous.com',
    redirects: [
      {
        source: '/',
        destination: '/shop',
        permanent: true
      }
    ]
  }
};
