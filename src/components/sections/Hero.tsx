import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { getWhatsAppUrl } from '@/lib/utils'

export function Hero() {
  const { hero } = siteConfig.secciones
  const { negocio } = siteConfig

  if (!hero.activo) return null

  const handleCtaClick = () => {
    if (hero.cta.tipo === 'whatsapp') {
      return getWhatsAppUrl(negocio.whatsapp, hero.cta.mensaje)
    }
    return '#contacto'
  }

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.imagen}
          alt={hero.titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 text-white">
        <div className="max-w-2xl">
          <p className="text-secondary text-sm uppercase tracking-widest mb-4">
            {negocio.especialidad}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {hero.titulo}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {hero.subtitulo}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
              <a href={handleCtaClick()} target={hero.cta.tipo === 'whatsapp' ? '_blank' : undefined}>
                {hero.cta.texto}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="#servicios">
                Ver Tratamientos
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
