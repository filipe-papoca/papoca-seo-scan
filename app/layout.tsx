// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Papoca Scan — Diagnóstico de Visibilidade GEO",
  description:
    "Análise técnica gratuita de quão preparado seu site está para ser encontrado, lido e citado por ChatGPT, Claude, Gemini e Perplexity.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
