'use client'

import { siteConfig } from '@/config/site'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FAQ() {
  const { faq } = siteConfig.secciones

  if (!faq.activo || faq.items.length === 0) return null

  return (
    <section id="faq" className="section-padding">
      <div className="section-container">
        <h2 className="section-title">{faq.titulo}</h2>

        <div className="max-w-3xl mx-auto mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faq.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.pregunta}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.respuesta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
