import { siteConfig } from '@/config/site'
import { Instagram, Facebook, Linkedin } from 'lucide-react'

export function Footer() {
  const { negocio, footer } = siteConfig

  return (
    <footer className="bg-primary text-white py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{negocio.nombre}</h3>
            <p className="text-gray-300 text-sm">
              {negocio.especialidad}
            </p>
            <p className="text-gray-300 text-sm mt-2">
              {negocio.direccion}
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="text-gray-300 hover:text-secondary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-gray-300 hover:text-secondary transition-colors">
                  Tratamientos
                </a>
              </li>
              <li>
                <a href="#sobre-mi" className="text-gray-300 hover:text-secondary transition-colors">
                  Sobre Mí
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-gray-300 hover:text-secondary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h4 className="font-semibold mb-4">Seguinos</h4>
            <div className="flex gap-4">
              {footer.redes.instagram && (
                <a
                  href={footer.redes.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {footer.redes.facebook && (
                <a
                  href={footer.redes.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {footer.redes.linkedin && (
                <a
                  href={footer.redes.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>{footer.copyright}</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href={footer.legal.privacidad} className="hover:text-secondary">
              Política de Privacidad
            </a>
            <a href={footer.legal.terminos} className="hover:text-secondary">
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
