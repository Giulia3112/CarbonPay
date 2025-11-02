"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 backdrop-blur-lg bg-background/95 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 focus-visible-ring rounded-lg">
          <div className="relative">
            <div className="absolute inset-0 bg-primary blur-xl opacity-50" />
            <Leaf className="h-8 w-8 text-primary relative z-10" aria-hidden="true" />
          </div>
          <span className="text-2xl font-bold text-foreground">CarbonPay</span>
        </Link>

        <Link href="/verificar">
          <Button
            size="lg"
            className="relative overflow-hidden group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/50 glow-green glow-green-hover focus-visible-ring transition-all duration-300"
            aria-label="Verificar elegibilidade da minha fazenda"
          >
            <span className="absolute inset-0 bg-primary blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
            <span className="relative z-10">Quero verificar minha elegibilidade</span>
          </Button>
        </Link>
      </div>
    </header>
  )
}
