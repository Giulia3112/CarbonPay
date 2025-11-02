import React from "react"
import { Card } from "@/components/ui/card"
import { DollarSign, Sprout, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: DollarSign,
    title: "Financiamos a certificação",
    description: "Cobrimos todos os custos iniciais da certificação da sua fazenda. Você não paga nada para começar.",
  },
  {
    icon: Sprout,
    title: "Práticas regenerativas",
    description: "Você segue práticas regenerativas e recebe acompanhamento técnico especializado da nossa equipe.",
  },
  {
    icon: TrendingUp,
    title: "Comercializamos e dividimos",
    description: "Comercializamos seus créditos de carbono e você recebe os dividendos de forma recorrente.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Como Funciona</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Um processo simples e transparente para transformar sua fazenda em uma fonte de renda sustentável
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

              <div className="relative z-10 space-y-4">
                <div className="relative w-fit">
                  <div className="absolute inset-0 bg-primary/30 blur-xl" />
                  <div className="relative bg-primary/20 p-4 rounded-lg">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-primary/40">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-bold text-card-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
