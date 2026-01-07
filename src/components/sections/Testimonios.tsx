import { siteConfig } from '@/config/site'
import { Star, Quote } from 'lucide-react'

export function Testimonios() {
  const { testimonios } = siteConfig.secciones

  if (!testimonios.activo || testimonios.items.length === 0) return null

  return (
    <section id="testimonios" className="section-padding bg-primary text-white">
      <div className="section-container">
        <h2 className="section-title text-white">{testimonios.titulo}</h2>
        <p className="section-subtitle text-gray-300">{testimonios.subtitulo}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonios.items.map((testimonio, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 relative"
            >
              <Quote className="w-8 h-8 text-secondary/50 absolute top-4 right-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonio.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Texto */}
              <p className="text-gray-200 mb-4 italic">
                &ldquo;{testimonio.texto}&rdquo;
              </p>

              {/* Info */}
              <div className="border-t border-white/20 pt-4">
                <p className="font-semibold">{testimonio.nombre}</p>
                <p className="text-sm text-secondary">{testimonio.tratamiento}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
