'use client'

import { siteConfig } from '@/config/site'
import { getWhatsAppUrl } from '@/lib/utils'
import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const { negocio } = siteConfig

  return (
    <a
      href={getWhatsAppUrl(negocio.whatsapp, 'Hola, me gustaría más información')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}
