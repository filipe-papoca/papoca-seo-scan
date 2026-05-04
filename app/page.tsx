// app/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import type { ScanResult } from "../types/scan";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Methodology } from "./components/Methodology";
import { Loading } from "./components/Loading";
import { Result } from "./components/Result";
import { Footer } from "./components/Footer";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    if (!url || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao escanear.");
      setResult(data as ScanResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  }

  // Scroll suave pro resultado quando ele aparece
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  return (
    <>
      <Header />
      <Hero
        url={url}
        setUrl={setUrl}
        loading={loading}
        error={error}
        onSubmit={handleScan}
      />

      {!loading && !result && <Methodology />}
      {loading && <Loading url={url} />}
      {result && (
        <div ref={resultRef}>
          <Result result={result} />
        </div>
      )}

      <Footer />
    </>
  );
}
