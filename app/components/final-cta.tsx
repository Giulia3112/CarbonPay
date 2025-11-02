"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/15 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <div className="relative w-fit mx-auto animate-bounce">
            <div className="absolute inset-0 bg-primary blur-2xl opacity-70" />
            <div className="relative bg-primary/30 p-6 rounded-full">
              <TrendingUp className="h-16 w-16 text-primary" aria-hidden="true" />
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-balance">Pronto para transformar sua fazenda?</h2>

          <p className="text-xl text-muted-foreground text-pretty">
            Descubra se sua propriedade é elegível para receber financiamento e começar a gerar renda sustentável hoje
            mesmo.
          </p>

          <Link href="/verificar">
            <Button
              size="lg"
              className="relative overflow-hidden group bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl px-12 py-8 shadow-2xl glow-green glow-green-hover focus-visible-ring transition-all duration-300"
              aria-label="Verificar elegibilidade da minha fazenda"
            >
              <span className="absolute inset-0 bg-primary blur-3xl opacity-60 group-hover:opacity-80 transition-opacity" />
              <span className="relative z-10">Quero verificar minha elegibilidade</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

