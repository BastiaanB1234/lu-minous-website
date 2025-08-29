import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect naar webshop op subdomein
  redirect('https://shop.minous.app/shop')
}
