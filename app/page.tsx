import React from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { Benefits } from "@/components/benefits"
import { Commitment } from "@/components/commitment"
import { FinalCTA } from "@/components/final-cta"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorks />
      <Benefits />
      <Commitment />
      <FinalCTA />
    </main>
  )
}
