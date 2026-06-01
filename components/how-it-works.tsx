import { QrCode, FileText, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: QrCode,
    title: "Escaneie o QR Code",
    description:
      "Ao chegar em uma de nossas estações, escaneie o QR Code para acessar esta página de cadastro.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Preencha o Cadastro",
    description:
      "Complete o formulário com seus dados e envie um print do seu aplicativo de motorista mostrando seu cadastro ativo.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Receba a Aprovação",
    description:
      "Nossa equipe analisa seu cadastro em até 24h. Após aprovado, você recebe acesso aos valores especiais.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Processo Simples
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance font-[family-name:var(--font-heading)] tracking-tight">
            Como Funciona
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Em apenas 3 passos simples você garante seu desconto exclusivo nas recargas
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(50%+60px)] w-[calc(100%-60px)] h-[2px]">
                  <div className="w-full h-full bg-gradient-to-r from-primary/50 to-primary/20 rounded-full" />
                  <ArrowRight className="absolute -right-2 -top-2 w-5 h-5 text-primary/50" />
                </div>
              )}

              {/* Card */}
              <div className="relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 font-[family-name:var(--font-heading)]">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
