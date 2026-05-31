"use client";

import clsx from "clsx";
import { HairStyleId, useHairStore } from "@/store/useHairStore";

export function HairSelector() {
  const { selectedStyle, setStyle, styles } = useHairStore();

  return (
    <aside className="luxury-panel w-full rounded-[2rem] p-5 text-stone-900 lg:max-w-xs">
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-stone-500">Hair atelier</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Escolha o corte</h2>
      <div className="mt-5 space-y-3">
        {styles.map((style) => (
          <button
            className={clsx(
              "w-full rounded-2xl border p-4 text-left transition duration-200",
              selectedStyle === style.id
                ? "border-stone-950 bg-stone-950 text-white shadow-2xl shadow-stone-900/20"
                : "border-white/70 bg-white/54 text-stone-800 hover:-translate-y-0.5 hover:bg-white/80",
            )}
            key={style.id}
            onClick={() => setStyle(style.id as HairStyleId)}
            type="button"
          >
            <span className="flex items-center justify-between gap-4">
              <span className="font-semibold">{style.name}</span>
              <span className="rounded-full bg-white/18 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em]">
                {style.texture}
              </span>
            </span>
            <span className={clsx("mt-2 block text-sm", selectedStyle === style.id ? "text-stone-200" : "text-stone-500")}>
              {style.description}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
