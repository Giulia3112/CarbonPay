import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // URL da API externa
    const apiUrl = process.env.API_URL || "https://determined-faraday.187-45-182-250.plesk.page/api/analise-fazenda"
    
    // Fazer requisição para a API externa
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { 
          ok: false, 
          error: `Erro na API: ${response.status}`,
          details: errorText 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro no proxy da API:", error)
    return NextResponse.json(
      { 
        ok: false, 
        error: error instanceof Error ? error.message : "Erro desconhecido" 
      },
      { status: 500 }
    )
  }
}

