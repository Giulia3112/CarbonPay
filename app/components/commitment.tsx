import React from "react"
import { Heart } from "lucide-react"

export function Commitment() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="relative w-fit mx-auto">
            <div className="absolute inset-0 bg-primary/40 blur-2xl" />
            <div className="relative bg-primary/20 p-6 rounded-full">
              <Heart className="h-12 w-12 text-primary fill-primary" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-balance">Compromisso CarbonPay</h2>

          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed text-pretty max-w-3xl mx-auto">
            Reinvestimos parte dos nossos lucros no desenvolvimento das fazendas que geram nossos créditos.{" "}
            <span className="text-primary font-semibold">Crescemos juntos, com propósito.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
