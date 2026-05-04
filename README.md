# Papoca Scan — Diagnóstico de Visibilidade GEO

Ferramenta pública de diagnóstico técnico para verificar se um site está preparado para ser encontrado, lido e citado por modelos de IA (ChatGPT, Gemini, Perplexity, Claude).

**Subdomínio alvo:** `scan.agenciapapoca.com.br`
**Stack:** Next.js 14 + TypeScript + CSS global (sem Tailwind)
**Identidade visual:** Design System Papoca aplicado

---

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Para testar o scan via terminal sem subir UI:

```bash
npx tsx scripts/scan-cli.ts https://exemplo.com.br
```

## Variáveis de ambiente (produção)

Crie `.env.local` (não comitar) com:

```
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

Em desenvolvimento, sem essas variáveis, o rate limit fica desativado (loga aviso).

## Deploy

1. Push para GitHub
2. Importa no Vercel
3. Configura as duas envs do Upstash (free tier resolve)
4. Aponta DNS de `scan.agenciapapoca.com.br` para o Vercel

## Estrutura

```
papoca-scan/
├── app/
│   ├── layout.tsx              # Layout raiz
│   ├── page.tsx                # Orquestra estados (initial/loading/result)
│   ├── globals.css             # CSS completo do DS Papoca
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx            # Inclui formulário de scan
│   │   ├── Methodology.tsx     # Seção mostrada antes do scan
│   │   ├── Loading.tsx         # Stages animados durante o scan
│   │   ├── Result.tsx          # Score + sumário + prioridades + checks + CTA
│   │   └── Footer.tsx
│   └── api/
│       └── scan/route.ts       # POST /api/scan (rate limit + SSRF + scan)
├── lib/
│   ├── orchestrator.ts         # Roda checks em paralelo, calcula score
│   ├── checks/                 # Cada check em arquivo próprio
│   └── utils/                  # SSRF, fetcher, rate limit
├── public/
│   ├── logo-branco.png
│   └── logo-roda.png
├── scripts/
│   └── scan-cli.ts             # CLI para testar/calibrar
└── types/
    └── scan.ts
```

## Por que não usei Tailwind

O Design System Papoca já é completo (variáveis CSS, componentes, tokens). Adicionar Tailwind significaria mapear o DS inteiro pro `tailwind.config` e ainda assim escapar pra `style={{...}}` em casos específicos. CSS global com variáveis é mais honesto e facilita manutenção quando o DS evoluir.

## O que ainda falta antes de produção

1. **Calibração do score.** Os pesos dos checks são chute educado. Roda em 30 sites diversos (grandes/médios/ruins) e ajusta.
2. **Copy dos checks.** As mensagens em `lib/checks/*.ts` estão técnicas demais. Reescreve com tom Papoca antes de lançar.
3. **Captura opcional de email.** Não está implementada — esperando definição do programa de nutrição.
4. **Testes.** Nenhum teste automatizado escrito.
