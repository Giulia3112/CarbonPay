"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, TrendingUp, DollarSign, Leaf, AlertCircle, FileText } from "lucide-react"

interface ApiResponse {
  ok: boolean
  stored: boolean
  response_id: string
  data: {
    area_cultivo: {
      hectares: number
      creditos_por_ha: string
      creditos_total: string
    }
    area_desmatamento_evitado: {
      hectares: number
      creditos_por_ha: string
      creditos_total: string
    }
    potencial_geracao: {
      creditos_total: string
    }
    valor_estimado: {
      preco_credito: number
      valor_anual: string
    }
    observacoes: string
  }
}

export default function ResultadoPage() {
  const router = useRouter()
  const [apiData, setApiData] = React.useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const storedApiData = sessionStorage.getItem("apiResponse")
    if (storedApiData) {
      try {
        const parsed = JSON.parse(storedApiData)
        setApiData(parsed)
      } catch (error) {
        console.error("Erro ao parsear dados da API:", error)
      }
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Carregando resultados...</p>
        </div>
      </div>
    )
  }

  if (!apiData || !apiData.ok) {
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto fade-in">
            <Card className="glass-card p-8 space-y-6 text-center">
              <div className="flex justify-center">
                <AlertCircle className="h-20 w-20 text-destructive" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold">Erro ao processar dados</h1>
                <p className="text-muted-foreground">
                  Não foi possível carregar os resultados. Por favor, tente novamente.
                </p>
              </div>
              <div className="pt-6">
                <Link href="/verificar">
                  <Button variant="outline" className="focus-visible-ring">
                    Voltar para o formulário
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const { data } = apiData

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6 fade-in">
          {/* Cabeçalho de sucesso */}
          <Card className="glass-card p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-2xl opacity-50" />
                <CheckCircle2 className="h-20 w-20 text-primary relative z-10" />
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold">
                Análise Concluída com Sucesso!
              </CardTitle>
              <CardDescription className="text-base">
                Sua propriedade foi analisada e aqui estão os resultados estimados de geração de créditos de carbono.
              </CardDescription>
            </CardHeader>
            {apiData.response_id && (
              <p className="text-xs text-muted-foreground mt-2">
                ID da resposta: {apiData.response_id}
              </p>
            )}
          </Card>

          {/* Área de Cultivo */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <CardTitle>Área de Cultivo</CardTitle>
              </div>
              <CardDescription>Créditos de carbono por sequestro no solo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Hectares</p>
                  <p className="text-2xl font-bold">{data.area_cultivo.hectares} ha</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Créditos por ha</p>
                  <p className="text-2xl font-bold">{data.area_cultivo.creditos_por_ha}</p>
                  <p className="text-xs text-muted-foreground mt-1">tCO2e/ha/ano</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total (anual)</p>
                  <p className="text-2xl font-bold text-primary">{data.area_cultivo.creditos_total}</p>
                  <p className="text-xs text-muted-foreground mt-1">tCO2e/ano</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Área de Desmatamento Evitado */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <CardTitle>Área de Desmatamento Evitado</CardTitle>
              </div>
              <CardDescription>Créditos por preservação de estoque de carbono</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Hectares</p>
                  <p className="text-2xl font-bold">{data.area_desmatamento_evitado.hectares} ha</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Créditos por ha</p>
                  <p className="text-2xl font-bold">{data.area_desmatamento_evitado.creditos_por_ha}</p>
                  <p className="text-xs text-muted-foreground mt-1">tCO2e/ha</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total (estimado)</p>
                  <p className="text-2xl font-bold text-primary">{data.area_desmatamento_evitado.creditos_total}</p>
                  <p className="text-xs text-muted-foreground mt-1">tCO2e</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Potencial de Geração */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>Potencial Total de Geração</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {data.potencial_geracao.creditos_total}
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.potencial_geracao.creditos_total.split("(")[1]?.replace(")", "")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Valor Estimado */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <CardTitle>Valor Estimado</CardTitle>
              </div>
              <CardDescription>
                Preço por crédito: R$ {data.valor_estimado.preco_credito.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 space-y-4">
                {data.valor_estimado.valor_anual.split(";").map((valorPart, index) => {
                  const isCultivo = valorPart.includes("Cultivo") || valorPart.includes("cultivo")
                  const valorLimpo = valorPart.split(":")[1]?.trim() || valorPart.trim()
                  
                  return (
                    <div 
                      key={index} 
                      className={index > 0 ? "pt-4 border-t border-primary/20 space-y-2" : "space-y-2"}
                    >
                      <p className="text-lg font-semibold">
                        {isCultivo ? "Receita Potencial Anual (Cultivo):" : "Receita por Desmatamento Evitado:"}
                      </p>
                      <p className="text-xl text-primary font-bold">
                        {valorLimpo}
                      </p>
                      {!isCultivo && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Venda tipicamente única ou por período de credenciamento
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Observações e Recomendações</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {data.observacoes}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              asChild
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground glow-green glow-green-hover focus-visible-ring"
            >
              <Link href="/">
                Início
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto focus-visible-ring"
            >
              <Link href="/verificar">
                Fazer nova análise
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
