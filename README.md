# CarbonPay

Aplicação Next.js para verificação de elegibilidade de fazendas para programas de crédito de carbono.

## 🚀 Deploy no Vercel

Este projeto está configurado para deploy automático no Vercel.

### Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Repositório Git (GitHub, GitLab ou Bitbucket)

### Passos para Deploy

1. **Conectar o repositório ao Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Add New Project"
   - Importe seu repositório Git

2. **Configurar variáveis de ambiente:**
   - No dashboard do Vercel, vá em Settings > Environment Variables
   - Adicione a variável:
     ```
     API_URL=https://determined-faraday.187-45-182-250.plesk.page/api/analise-fazenda
     ```
   - Ou use outro valor se necessário

3. **Deploy automático:**
   - O Vercel detectará automaticamente que é um projeto Next.js
   - O build será executado automaticamente
   - O deploy acontecerá em cada push para a branch principal

### Configuração Local

1. Clone o repositório:
   ```bash
   git clone <seu-repositorio>
   cd CarbonPay
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env.local` com:
   ```env
   API_URL=https://determined-faraday.187-45-182-250.plesk.page/api/analise-fazenda
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

### Variáveis de Ambiente

- `API_URL` (opcional) - URL da API externa para análise de fazenda. Se não definida, será usada a URL padrão.

### Estrutura do Projeto

```
CarbonPay/
├── app/              # App Router do Next.js
│   ├── api/         # Rotas da API
│   ├── components/  # Componentes React
│   └── ...
├── lib/             # Utilitários
└── public/          # Arquivos estáticos
```

### Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes UI acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas

