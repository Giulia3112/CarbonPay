import React from "react"
import { Card } from "@/components/ui/card"
import { Award, CircleDollarSign, Leaf, RefreshCw } from "lucide-react"

const benefits = [
  {
    icon: CircleDollarSign,
    title: "Lucro recorrente",
    description: "Receba dividendos contínuos com a comercialização dos créditos de carbono gerados pela sua fazenda.",
  },
  {
    icon: Award,
    title: "Certificação sem custo",
    description: "Financiamos 100% do processo de certificação. Você não precisa investir nada para começar.",
  },
  {
    icon: Leaf,
    title: "Acesso a programas verdes",
    description: "Fazendas certificadas têm acesso prioritário a programas governamentais e incentivos ambientais.",
  },
  {
    icon: RefreshCw,
    title: "Reinvestimento contínuo",
    description: "Parte dos lucros é reinvestida no desenvolvimento e melhoria contínua das fazendas parceiras.",
  },
]

export function Benefits() {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/30">
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-3 bg-primary/20 border border-primary/30 rounded-full">
            <p className="text-primary font-semibold text-lg">
              Fazendas certificadas e regenerativas são elegíveis a mais créditos verdes e programas governamentais
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Benefícios ao Agricultor</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="space-y-4">
                <div className="relative w-fit">
                  <div className="absolute inset-0 bg-primary/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-primary/20 p-3 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-card-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
