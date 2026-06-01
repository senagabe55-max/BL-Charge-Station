"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a3a2f]/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BL%20charage%20image%20logo-urZ9p1qQDy7rFxQhq6CVIt0hzkuUX3.avif"
              alt="BL Charge Station"
              width={160}
              height={50}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#como-funciona"
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              Como Funciona
            </Link>
            <Link
              href="#beneficios"
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              Benefícios
            </Link>
            <Link
              href="#cadastro"
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              Cadastro
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6"
            >
              <Link href="#cadastro">Solicitar Benefício</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1a3a2f] border-t border-white/10">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="#como-funciona"
              onClick={() => setIsMenuOpen(false)}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium py-2"
            >
              Como Funciona
            </Link>
            <Link
              href="#beneficios"
              onClick={() => setIsMenuOpen(false)}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium py-2"
            >
              Benefícios
            </Link>
            <Link
              href="#cadastro"
              onClick={() => setIsMenuOpen(false)}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium py-2"
            >
              Cadastro
            </Link>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white font-semibold w-full mt-2"
            >
              <Link href="#cadastro" onClick={() => setIsMenuOpen(false)}>
                Solicitar Benefício
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
