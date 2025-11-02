"use client"

import React from "react"
import { ElegibilityForm } from "@/components/elegibility-form"

export default function VerificarPage() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 space-y-4 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">
              Verifique a elegibilidade da sua fazenda
            </h1>
            <p className="text-lg text-muted-foreground">
              Aceitamos apenas propriedades com cultivo ≥ 30 hectares.
            </p>
          </div>
          <ElegibilityForm />
        </div>
      </div>
    </div>
  )
}

