import {
  Header,
  Hero,
  Servicios,
  SobreMi,
  Testimonios,
  FAQ,
  Contacto,
  Footer,
} from '@/components/sections'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <SobreMi />
        <Testimonios />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
