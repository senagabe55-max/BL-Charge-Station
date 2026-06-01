import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0f2a20] border-t border-white/10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BL%20charage%20image%20logo-urZ9p1qQDy7rFxQhq6CVIt0hzkuUX3.avif"
                alt="BL Charge Station"
                width={140}
                height={44}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/60 leading-relaxed max-w-md mb-6">
              A BL Charge Station é referência em recarga de veículos elétricos em Belo Horizonte.
              Tecnologia de ponta, preços justos e compromisso com a mobilidade sustentável.
            </p>
            <p className="text-white/40 text-sm">
              O ponto de recarga mais tecnológico de BH. Energia rápida e preços que cabem no bolso.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Links Rápidos</h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="#como-funciona"
                className="text-white/60 hover:text-primary transition-colors"
              >
                Como Funciona
              </Link>
              <Link
                href="#beneficios"
                className="text-white/60 hover:text-primary transition-colors"
              >
                Benefícios
              </Link>
              <Link
                href="#cadastro"
                className="text-white/60 hover:text-primary transition-colors"
              >
                Cadastro
              </Link>
              <Link
                href="https://blchargestation.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary transition-colors"
              >
                Site Oficial
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-5">Redes Sociais</h4>
            <div className="flex items-center gap-3 mb-6">
              <a
                href="https://instagram.com/blchargestation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white/70 group-hover:text-white" />
              </a>
              <a
                href="https://facebook.com/blchargestation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white/70 group-hover:text-white" />
              </a>
              <a
                href="https://linkedin.com/company/blchargestation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white" />
              </a>
            </div>
            <p className="text-white/50 text-sm">Belo Horizonte, MG</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              © {new Date().getFullYear()} BL Charge Station. Todos os direitos reservados.
            </p>
            <p className="text-white/30 text-xs">
              Compromisso com a mobilidade elétrica e sustentabilidade
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
