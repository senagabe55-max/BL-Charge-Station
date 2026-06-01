import {
  Wallet,
  Clock,
  Shield,
  Award,
  Headphones,
  Zap,
} from "lucide-react"

const benefits = [
  {
    icon: Wallet,
    title: "Economia Diária",
    description:
      "Reduza significativamente seus custos de recarga com preços exclusivos para motoristas parceiros.",
  },
  {
    icon: Clock,
    title: "Aprovação Rápida",
    description:
      "Processo simplificado com análise em até 24 horas. Comece a economizar rapidamente.",
  },
  {
    icon: Shield,
    title: "Estações Modernas",
    description:
      "Equipamentos de última geração com tecnologia de ponta para recarga rápida e segura.",
  },
  {
    icon: Award,
    title: "Benefício Exclusivo",
    description:
      "Programa especial desenvolvido pensando nas necessidades dos motoristas de aplicativo.",
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    description:
      "Atendimento especializado via WhatsApp para tirar dúvidas e resolver qualquer situação.",
  },
  {
    icon: Zap,
    title: "Recarga Rápida",
    description:
      "Carregadores de alta potência para você voltar rapidamente às corridas e maximizar seus ganhos.",
  },
]

export function Benefits() {
  return (
    <section id="beneficios" className="py-20 md:py-28 bg-[#1a3a2f]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Vantagens
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance font-[family-name:var(--font-heading)] tracking-tight">
            Por Que Ser um Motorista Parceiro?
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Confira os benefícios exclusivos que você terá ao se cadastrar no programa
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-heading)]">{benefit.title}</h3>
              <p className="text-white/60 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
