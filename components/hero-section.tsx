import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Battery, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a3a2f] via-[#0f2a20] to-[#0a1f17]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-white/90 text-sm font-medium">
              Exclusivo para Motoristas de Aplicativo
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 text-balance font-[family-name:var(--font-heading)] tracking-tight">
            Motorista de App?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
              Economize
            </span>{" "}
            na Recarga do Seu Veículo Elétrico
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Cadastre-se agora e tenha acesso a preços especiais em todas as estações 
            BL Charge. Processo rápido, economia real no seu dia a dia.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all group w-full sm:w-auto"
            >
              <Link href="#cadastro">
                Solicitar Benefício
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white font-medium px-8 py-6 text-lg rounded-xl w-full sm:w-auto"
            >
              <Link href="#como-funciona">Saiba Como Funciona</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-heading)]">30%</span>
              </div>
              <p className="text-white/60 text-sm">Economia Média</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Battery className="w-5 h-5 text-primary" />
                <span className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-heading)]">500+</span>
              </div>
              <p className="text-white/60 text-sm">Motoristas Parceiros</p>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-heading)]">24h</span>
              </div>
              <p className="text-white/60 text-sm">Aprovação Rápida</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
