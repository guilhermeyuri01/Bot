"use client";

import { memo } from "react";
import { useHairStore } from "@/store/useHairStore";

export const PerformanceMonitor = memo(function PerformanceMonitor() {
  const performance = useHairStore((state) => state.performance);

  return (
    <div className="pointer-events-none absolute right-5 top-5 z-10 grid gap-2 rounded-3xl border border-white/70 bg-white/62 p-4 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600 shadow-xl shadow-stone-900/10 backdrop-blur-xl">
      <span className="flex items-center justify-between gap-6"><b className="text-stone-950">FPS</b>{performance.fps}</span>
      <span className="flex items-center justify-between gap-6"><b className="text-stone-950">Mem</b>{performance.memoryMb ? `${performance.memoryMb} MB` : "N/D"}</span>
      <span className="flex items-center justify-between gap-6"><b className="text-stone-950">Qual.</b>{performance.quality}</span>
    </div>
  );
});
