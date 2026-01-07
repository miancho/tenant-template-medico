import Image from 'next/image'
import { siteConfig } from '@/config/site'
import { CheckCircle } from 'lucide-react'

export function SobreMi() {
  const { sobreMi } = siteConfig.secciones

  if (!sobreMi.activo) return null

  return (
    <section id="sobre-mi" className="section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagen */}
          <div className="relative">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src={sobreMi.imagen}
                alt={sobreMi.titulo}
                fill
                className="object-cover"
              />
            </div>
            {/* Decoración */}
            <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-secondary/20 rounded-lg -z-10" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-lg -z-10" />
          </div>

          {/* Contenido */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {sobreMi.titulo}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {sobreMi.contenido}
            </p>

            {/* Credenciales */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg mb-4">Credenciales</h3>
              {sobreMi.credenciales.map((credencial, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{credencial}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
