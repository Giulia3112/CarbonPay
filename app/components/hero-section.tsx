"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
            Sua fazenda pode gerar renda <span className="text-primary">regenerando o planeta</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
            A CarbonPay financia a certificação da sua propriedade e transforma o carbono do seu solo em lucro
            sustentável.
          </p>

          <div className="pt-4">
            <Link href="/verificar" className="inline-block">
              <Button
                size="lg"
                className="relative overflow-hidden group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 shadow-2xl glow-green glow-green-hover focus-visible-ring transition-all duration-300"
                aria-label="Verificar elegibilidade da minha fazenda"
              >
                <span className="absolute inset-0 bg-primary blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  Quero verificar minha elegibilidade
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
