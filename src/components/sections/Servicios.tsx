import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { ArrowRight } from 'lucide-react'

export function Servicios() {
  const { servicios } = siteConfig.secciones

  if (!servicios.activo) return null

  return (
    <section id="servicios" className="section-padding bg-muted">
      <div className="section-container">
        <h2 className="section-title">{servicios.titulo}</h2>
        <p className="section-subtitle">{servicios.subtitulo}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicios.items.map((servicio) => (
            <Link
              key={servicio.id}
              href={`/${servicio.slug}`}
              className="group bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={servicio.imagen}
                  alt={servicio.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {servicio.nombre}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {servicio.descripcion}
                </p>
                <span className="inline-flex items-center text-sm text-primary font-medium">
                  Ver más
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
