"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { ToastContext } from "@/components/ui/toast-context"
import { Loader2, HelpCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const ESTADOS_BRASIL = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
]

// Mapeamento de siglas para nomes completos dos estados
const ESTADOS_NOMES: Record<string, string> = {
  "AC": "Acre",
  "AL": "Alagoas",
  "AP": "Amapá",
  "AM": "Amazonas",
  "BA": "Bahia",
  "CE": "Ceará",
  "DF": "Distrito Federal",
  "ES": "Espírito Santo",
  "GO": "Goiás",
  "MA": "Maranhão",
  "MT": "Mato Grosso",
  "MS": "Mato Grosso do Sul",
  "MG": "Minas Gerais",
  "PA": "Pará",
  "PB": "Paraíba",
  "PR": "Paraná",
  "PE": "Pernambuco",
  "PI": "Piauí",
  "RJ": "Rio de Janeiro",
  "RN": "Rio Grande do Norte",
  "RS": "Rio Grande do Sul",
  "RO": "Rondônia",
  "RR": "Roraima",
  "SC": "Santa Catarina",
  "SP": "São Paulo",
  "SE": "Sergipe",
  "TO": "Tocantins"
}

const TIPOS_SOLO = [
  "Argiloso",
  "Arenoso",
  "Siltoso",
  "Latossolo",
  "Cambissolo",
  "Neossolo",
  "Não sei / Outro"
]

interface FormErrors {
  areaFazenda?: string
  areaCultivo?: string
  tipoSolo?: string
  localizacao?: string
  cidade?: string
  estado?: string
  areaNativa?: string
  metodoPlantio?: string
  email?: string
  telefone?: string
}

export function ElegibilityForm() {
  const router = useRouter()
  const { addToast } = React.useContext(ToastContext)

  const [formData, setFormData] = React.useState({
    areaFazenda: "",
    areaCultivo: "",
    tipoSolo: "",
    localizacao: "",
    cidade: "",
    estado: "",
    areaNativa: "",
    metodoPlantio: "",
    email: "",
    telefone: ""
  })

  const [errors, setErrors] = React.useState<FormErrors>({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "areaFazenda":
        if (!value || parseFloat(value) <= 0) {
          return "A área da fazenda deve ser maior que 0"
        }
        break
      case "areaCultivo":
        if (!value || parseFloat(value) < 30) {
          return "Aceitamos apenas área de cultivo a partir de 30 ha."
        }
        if (formData.areaFazenda && parseFloat(value) > parseFloat(formData.areaFazenda)) {
          return "A área de cultivo não pode ser maior que a área total da fazenda."
        }
        break
      case "tipoSolo":
        if (!value) return "Selecione o tipo de solo"
        break
      case "localizacao":
        if (!value.trim()) return "Informe a localização ou coordenadas"
        break
      case "cidade":
        if (!value.trim()) return "Informe a cidade"
        break
      case "estado":
        if (!value) return "Selecione o estado"
        break
      case "areaNativa":
        if (!value) return "Selecione se possui área nativa"
        break
      case "metodoPlantio":
        if (!value.trim()) return "Descreva o método de plantio"
        break
      case "email":
        if (!value.trim()) return "Informe seu e-mail"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "E-mail inválido"
        }
        break
      case "telefone":
        if (!value.trim()) return "Informe seu telefone"
        // Remove caracteres não numéricos para validação
        const cleanPhone = value.replace(/\D/g, "")
        if (cleanPhone.length < 10 || cleanPhone.length > 11) {
          return "Telefone inválido (deve ter 10 ou 11 dígitos)"
        }
        break
    }
    return undefined
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        newErrors[key as keyof FormErrors] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setTouched((prev) => ({ ...prev, [name]: true }))
    
    // Validar em tempo real quando o campo é alterado
    const error = validateField(name, value)
    setErrors((prev) => {
      if (error) {
        return { ...prev, [name]: error }
      } else {
        const newErrors = { ...prev }
        delete newErrors[name as keyof FormErrors]
        return newErrors
      }
    })
  }

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name as keyof typeof formData])
    setErrors((prev) => {
      if (error) {
        return { ...prev, [name]: error }
      } else {
        const newErrors = { ...prev }
        delete newErrors[name as keyof FormErrors]
        return newErrors
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      addToast({
        variant: "destructive",
        title: "Erro de validação",
        description: "Por favor, corrija os campos destacados antes de continuar."
      })
      return
    }

    setIsLoading(true)

    try {
      // URL da API - usar rota do Next.js como proxy para evitar problemas de CORS
      const apiUrl = "/api/analise-fazenda"
      
      // Preparar dados para envio no formato esperado pela API
      const telefoneLimpo = formData.telefone.replace(/\D/g, "")
      const estadoNome = ESTADOS_NOMES[formData.estado] || formData.estado
      
      const payload = {
        area_total: parseFloat(formData.areaFazenda),
        area_cultivo: parseFloat(formData.areaCultivo),
        tipo_solo: formData.tipoSolo,
        cidade: formData.cidade,
        estado: estadoNome,
        area_nativa: formData.areaNativa === "sim" ? parseFloat(formData.areaFazenda) - parseFloat(formData.areaCultivo) : 0,
        metodo_plantio: formData.metodoPlantio,
        email: formData.email,
        telefone: telefoneLimpo
      }

      // Fazer chamada à API
      console.log("Enviando dados para:", apiUrl)
      console.log("Payload:", payload)
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
        // Adicionar opções para debug
        mode: "cors",
        credentials: "omit",
      })

      console.log("Status da resposta:", response.status)
      console.log("Headers da resposta:", response.headers)

      if (!response.ok) {
        let errorMessage = `Erro na API: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch (e) {
          const errorText = await response.text()
          errorMessage = errorText || errorMessage
        }
        throw new Error(errorMessage)
      }

      const apiResponse = await response.json()
      console.log("Resposta da API:", apiResponse)

      if (apiResponse.ok && apiResponse.data) {
        // Salvar resposta da API no sessionStorage
        sessionStorage.setItem("apiResponse", JSON.stringify(apiResponse))
        
        // Também salvar dados do formulário para referência
        sessionStorage.setItem("elegibilityData", JSON.stringify({
          ...formData,
          isEligible: true
        }))

        addToast({
          variant: "default",
          title: "Sucesso!",
          description: "Análise concluída com sucesso. Redirecionando..."
        })

        router.push("/resultado")
      } else {
        throw new Error("Resposta da API inválida")
      }
    } catch (error) {
      console.error("Erro completo ao enviar dados:", error)
      
      let errorMessage = "Ocorreu um erro ao enviar seus dados. Por favor, tente novamente."
      
      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde. Se o problema persistir, pode ser um problema de CORS no servidor."
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      addToast({
        variant: "destructive",
        title: "Erro ao processar",
        description: errorMessage
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = React.useMemo(() => {
    // Verificar se todos os campos obrigatórios estão preenchidos
    const areaFazenda = formData.areaFazenda?.trim() || ""
    const areaCultivo = formData.areaCultivo?.trim() || ""
    const tipoSolo = formData.tipoSolo || ""
    const localizacao = formData.localizacao?.trim() || ""
    const cidade = formData.cidade?.trim() || ""
    const estado = formData.estado || ""
    const areaNativa = formData.areaNativa || ""
    const metodoPlantio = formData.metodoPlantio?.trim() || ""
    const email = formData.email?.trim() || ""
    const telefone = formData.telefone?.trim() || ""

    if (!areaFazenda || !areaCultivo || !tipoSolo || !localizacao || 
        !cidade || !estado || !areaNativa || !metodoPlantio || !email || !telefone) {
      return false
    }

    // Verificar validade numérica dos campos
    const areaFazendaNum = parseFloat(areaFazenda)
    const areaCultivoNum = parseFloat(areaCultivo)
    
    if (isNaN(areaFazendaNum) || areaFazendaNum <= 0) {
      return false
    }
    
    if (isNaN(areaCultivoNum) || areaCultivoNum < 30 || areaCultivoNum > areaFazendaNum) {
      return false
    }

    // Verificar email válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return false
    }

    // Verificar telefone válido (pelo menos 10 dígitos)
    const telefoneLimpo = telefone.replace(/\D/g, "")
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      return false
    }

    return true
  }, [formData])

  return (
    <form onSubmit={handleSubmit} className="space-y-6 fade-in">
      <Card className="glass-card p-6 space-y-6">
        {/* Área da Fazenda */}
        <div className="space-y-2">
          <Label htmlFor="areaFazenda">
            Área da fazenda (ha) <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="areaFazenda"
              type="number"
              step="0.01"
              min="0"
              placeholder="Ex.: 120"
              value={formData.areaFazenda}
              onChange={(e) => handleChange("areaFazenda", e.target.value)}
              onBlur={() => handleBlur("areaFazenda")}
              className={cn(errors.areaFazenda && "border-destructive")}
              aria-invalid={!!errors.areaFazenda}
              aria-describedby={errors.areaFazenda ? "areaFazenda-error" : undefined}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              ha
            </span>
          </div>
          {errors.areaFazenda && (
            <p id="areaFazenda-error" className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.areaFazenda}
            </p>
          )}
        </div>

        {/* Área de Cultivo */}
        <div className="space-y-2">
          <Label htmlFor="areaCultivo">
            Área de cultivo (ha) <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="areaCultivo"
              type="number"
              step="0.01"
              min="0"
              placeholder="Ex.: 80"
              value={formData.areaCultivo}
              onChange={(e) => handleChange("areaCultivo", e.target.value)}
              onBlur={() => handleBlur("areaCultivo")}
              className={cn(errors.areaCultivo && "border-destructive")}
              aria-invalid={!!errors.areaCultivo}
              aria-describedby={errors.areaCultivo ? "areaCultivo-error" : undefined}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              ha
            </span>
          </div>
          {errors.areaCultivo && (
            <p id="areaCultivo-error" className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.areaCultivo}
            </p>
          )}
          {formData.areaCultivo && parseFloat(formData.areaCultivo) < 30 && (
            <p className="text-sm text-muted-foreground flex items-start gap-2 p-3 bg-secondary/30 rounded-md">
              <HelpCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>No momento financiamos produtores com 30 ha ou mais em área de cultivo.</span>
            </p>
          )}
        </div>

        {/* Tipo de Solo */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="tipoSolo">
              Tipo de solo <span className="text-destructive">*</span>
            </Label>
            <div className="group relative">
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-card border border-border rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Se não tiver certeza, selecione 'Não sei / Outro'.
              </span>
            </div>
          </div>
          <Select
            value={formData.tipoSolo}
            onValueChange={(value) => handleChange("tipoSolo", value)}
          >
            <SelectTrigger
              id="tipoSolo"
              className={cn(errors.tipoSolo && "border-destructive")}
              aria-invalid={!!errors.tipoSolo}
              aria-describedby={errors.tipoSolo ? "tipoSolo-error" : undefined}
            >
              <SelectValue placeholder="Selecione o tipo de solo" />
            </SelectTrigger>
            <SelectContent>
              {TIPOS_SOLO.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.tipoSolo && (
            <p id="tipoSolo-error" className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.tipoSolo}
            </p>
          )}
        </div>

        {/* Localização */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="localizacao">
              Localização (coordenadas ou endereço) <span className="text-destructive">*</span>
            </Label>
            <div className="group relative">
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-card border border-border rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Informe coordenadas (lat, long) ou endereço completo da propriedade.
              </span>
            </div>
          </div>
          <Input
            id="localizacao"
            type="text"
            placeholder="Coordenadas (lat,long) ou endereço completo"
            value={formData.localizacao}
            onChange={(e) => handleChange("localizacao", e.target.value)}
            onBlur={() => handleBlur("localizacao")}
            className={cn(errors.localizacao && "border-destructive")}
            aria-invalid={!!errors.localizacao}
            aria-describedby={errors.localizacao ? "localizacao-error" : undefined}
          />
          {errors.localizacao && (
            <p id="localizacao-error" className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.localizacao}
            </p>
          )}
        </div>

        {/* Cidade e Estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cidade">
              Cidade <span className="text-destructive">*</span>
            </Label>
            <Input
              id="cidade"
              type="text"
              placeholder="Nome da cidade"
              value={formData.cidade}
              onChange={(e) => handleChange("cidade", e.target.value)}
              onBlur={() => handleBlur("cidade")}
              className={cn(errors.cidade && "border-destructive")}
              aria-invalid={!!errors.cidade}
              aria-describedby={errors.cidade ? "cidade-error" : undefined}
            />
            {errors.cidade && (
              <p id="cidade-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.cidade}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="estado">
              Estado (UF) <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.estado}
              onValueChange={(value) => handleChange("estado", value)}
            >
              <SelectTrigger
                id="estado"
                className={cn(errors.estado && "border-destructive")}
                aria-invalid={!!errors.estado}
                aria-describedby={errors.estado ? "estado-error" : undefined}
              >
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                {ESTADOS_BRASIL.map((uf) => (
                  <SelectItem key={uf} value={uf}>
                    {uf}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.estado && (
              <p id="estado-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.estado}
              </p>
            )}
          </div>
        </div>

        {/* Possui área nativa */}
        <div className="space-y-3">
          <Label>
            Possui área nativa? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.areaNativa}
            onValueChange={(value) => handleChange("areaNativa", value)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="areaNativa-sim" />
              <Label htmlFor="areaNativa-sim" className="font-normal cursor-pointer">
                Sim
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="areaNativa-nao" />
              <Label htmlFor="areaNativa-nao" className="font-normal cursor-pointer">
                Não
              </Label>
            </div>
          </RadioGroup>
          {errors.areaNativa && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.areaNativa}
            </p>
          )}
        </div>

        {/* Método de plantio */}
        <div className="space-y-2">
          <Label htmlFor="metodoPlantio">
            Método de plantio <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="metodoPlantio"
            placeholder="Descreva o método de plantio predominante (ex.: plantio direto, convencional, integração lavoura-pecuária…)"
            rows={4}
            value={formData.metodoPlantio}
            onChange={(e) => handleChange("metodoPlantio", e.target.value)}
            onBlur={() => handleBlur("metodoPlantio")}
            className={cn(errors.metodoPlantio && "border-destructive")}
            aria-invalid={!!errors.metodoPlantio}
            aria-describedby={errors.metodoPlantio ? "metodoPlantio-error" : undefined}
          />
          {errors.metodoPlantio && (
            <p id="metodoPlantio-error" className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.metodoPlantio}
            </p>
          )}
        </div>

        {/* Email e Telefone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              E-mail do agricultor <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={cn(errors.email && "border-destructive")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">
              Telefone do agricultor <span className="text-destructive">*</span>
            </Label>
            <Input
              id="telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.telefone}
              onChange={(e) => {
                // Formatação automática do telefone
                let value = e.target.value.replace(/\D/g, "")
                if (value.length <= 11) {
                  if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
                  } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
                  }
                  handleChange("telefone", value)
                }
              }}
              onBlur={() => handleBlur("telefone")}
              className={cn(errors.telefone && "border-destructive")}
              aria-invalid={!!errors.telefone}
              aria-describedby={errors.telefone ? "telefone-error" : undefined}
              maxLength={15}
            />
            {errors.telefone && (
              <p id="telefone-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.telefone}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Botões */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Link href="/" className="w-full sm:w-auto">
          <Button
            type="button"
            variant="ghost"
            className="w-full sm:w-auto focus-visible-ring"
          >
            Voltar
          </Button>
        </Link>

        <Button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground glow-green glow-green-hover focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed disabled:glow-green:shadow-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analisando sua elegibilidade…
            </>
          ) : (
            "Verificar!"
          )}
        </Button>
      </div>

      {/* Privacidade */}
      <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
        Usamos seus dados apenas para pré-análise de elegibilidade. Nada é publicado sem sua autorização.
      </p>
    </form>
  )
}

