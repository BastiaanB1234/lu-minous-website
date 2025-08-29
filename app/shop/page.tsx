// Deze pagina is niet meer nodig - webshop is alleen beschikbaar op shop.minous.app
import { redirect } from 'next/navigation'

export default function ShopPage() {
  // Redirect naar webshop subdomein
  redirect('https://shop.minous.app')
}
