"use client";

import { useRef } from "react";
import { AvatarScene } from "@/components/AvatarScene";
import { ColorPicker } from "@/components/ColorPicker";
import { HairSelector } from "@/components/HairSelector";
import { PerformanceMonitor } from "@/components/ui/PerformanceMonitor";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function captureImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `lumiere-hair-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <main className="min-h-screen overflow-hidden px-4 py-5 text-stone-950 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-7xl flex-col gap-5">
        <header className="flex flex-col justify-between gap-4 rounded-[2rem] border border-white/70 bg-white/42 px-5 py-4 shadow-xl shadow-stone-900/5 backdrop-blur-2xl md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.42em] text-stone-500">Lumière Hair Studio</p>
            <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-[-0.06em] text-stone-950 sm:text-5xl">
              Provador virtual 3D para cabelos premium.
            </h1>
          </div>
          <button
            className="rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-stone-900/20 transition hover:-translate-y-0.5 hover:bg-stone-800"
            onClick={captureImage}
            type="button"
          >
            Capturar imagem PNG
          </button>
        </header>

        <div className="grid flex-1 gap-5 lg:grid-cols-[20rem_minmax(0,1fr)_20rem]">
          <HairSelector />

          <section className="relative min-h-[34rem] overflow-hidden rounded-[2.4rem] border border-white/70 bg-[radial-gradient(circle_at_50%_20%,#fffaf4_0%,#eee8e1_45%,#d6d0ca_100%)] shadow-2xl shadow-stone-900/15">
            <div className="absolute left-5 top-5 z-10 rounded-full border border-white/70 bg-white/58 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 backdrop-blur-xl">
              WebGL real-time 360°
            </div>
            <AvatarScene onCanvasReady={(canvas) => (canvasRef.current = canvas)} />
            <PerformanceMonitor />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-stone-950/18 to-transparent p-6 text-white">
              <p className="max-w-xl text-sm text-white/82">
                Arraste para rotacionar, faça pinch/scroll para zoom e use os controles laterais para trocar mesh, cor,
                brilho, LOD, qualidade gráfica e iluminação sem recarregar a cena.
              </p>
            </div>
          </section>

          <ColorPicker />
        </div>
      </section>
    </main>
  );
}
