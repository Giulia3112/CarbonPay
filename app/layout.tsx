import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ToastProvider } from "@/components/ui/toast-context"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CarbonPay - Fintech Verde para Agricultura Regenerativa",
  description: "Financiamos a certificação da sua fazenda e transformamos o carbono do seu solo em lucro sustentável.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} font-sans antialiased`}>
        <ToastProvider>
          {children}
          <Toaster />
          <Analytics />
        </ToastProvider>
      </body>
    </html>
  )
}
