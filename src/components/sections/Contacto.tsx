'use client'

import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { getWhatsAppUrl } from '@/lib/utils'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export function Contacto() {
  const { contacto } = siteConfig.secciones
  const { negocio } = siteConfig
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  if (!contacto.activo) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)

    try {
      await fetch(contacto.webhookFormulario, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tenant_id: siteConfig.tenant_id,
          timestamp: new Date().toISOString(),
        }),
      })
      setEnviado(true)
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' })
    } catch (error) {
      console.error('Error enviando formulario:', error)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section id="contacto" className="section-padding bg-muted">
      <div className="section-container">
        <h2 className="section-title">{contacto.titulo}</h2>
        <p className="section-subtitle">{contacto.subtitulo}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info de contacto */}
          <div>
            <div className="bg-background rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Información de Contacto</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-muted-foreground">{negocio.direccion}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <a href={`tel:${negocio.telefono}`} className="text-muted-foreground hover:text-primary">
                      {negocio.telefono}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${negocio.email}`} className="text-muted-foreground hover:text-primary">
                      {negocio.email}
                    </a>
                  </div>
                </div>

                {contacto.mostrarHorarios && (
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Horarios</p>
                      <p className="text-muted-foreground">{negocio.horarios.semana}</p>
                      <p className="text-muted-foreground">{negocio.horarios.sabado}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Botón WhatsApp */}
              <Button className="w-full mt-6 bg-green-600 hover:bg-green-700" asChild>
                <a
                  href={getWhatsAppUrl(negocio.whatsapp, 'Hola, me gustaría agendar una consulta')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar por WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Formulario */}
          {contacto.mostrarFormulario && (
            <div className="bg-background rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Envianos un mensaje</h3>

              {enviado ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">¡Mensaje enviado!</h4>
                  <p className="text-muted-foreground">
                    Nos pondremos en contacto a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      rows={4}
                      required
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={enviando}>
                    {enviando ? 'Enviando...' : 'Enviar mensaje'}
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
