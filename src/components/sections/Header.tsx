'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { getWhatsAppUrl } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

export function Header() {
  const { negocio } = siteConfig
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#servicios', label: 'Tratamientos' },
    { href: '#sobre-mi', label: 'Sobre Mí' },
    { href: '#testimonios', label: 'Testimonios' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image
                src={negocio.logo}
                alt={negocio.nombre}
                fill
                className="object-contain"
              />
            </div>
            <span
              className={`font-heading font-bold text-lg hidden sm:block ${
                isScrolled ? 'text-primary' : 'text-white'
              }`}
            >
              {negocio.nombre}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
              <a
                href={getWhatsAppUrl(negocio.whatsapp, 'Hola, me gustaría agendar una consulta')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar Consulta
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4">
            <div className="flex flex-col items-center gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-foreground font-medium hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <Button className="bg-secondary text-secondary-foreground mt-2" asChild>
                <a
                  href={getWhatsAppUrl(negocio.whatsapp, 'Hola, me gustaría agendar una consulta')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar Consulta
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
