"use client";

import { memo, useMemo } from "react";
import type { GraphicsQuality } from "@/types/hair";
import { useHairStore } from "@/store/useHairStore";

const swatches = ["#2b1712", "#5a3328", "#8a5639", "#c28a54", "#d8c4a5", "#5a1d22", "#111111"];
const qualities: GraphicsQuality[] = ["ultra", "high", "medium", "low"];

export const ControlPanel = memo(function ControlPanel() {
  const autoRotate = useHairStore((state) => state.autoRotate);
  const beforeMode = useHairStore((state) => state.beforeMode);
  const controls = useHairStore((state) => state.controls);
  const lightIntensity = useHairStore((state) => state.lightIntensity);
  const quality = useHairStore((state) => state.quality);
  const savedLooks = useHairStore((state) => state.savedLooks);
  const setControl = useHairStore((state) => state.setControl);
  const setLightIntensity = useHairStore((state) => state.setLightIntensity);
  const setQuality = useHairStore((state) => state.setQuality);
  const toggleAutoRotate = useHairStore((state) => state.toggleAutoRotate);
  const toggleBeforeMode = useHairStore((state) => state.toggleBeforeMode);
  const saveCurrentLook = useHairStore((state) => state.saveCurrentLook);
  const applyLook = useHairStore((state) => state.applyLook);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams({ q: quality, c: controls.color, s: `${controls.shine}` });
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }, [controls.color, controls.shine, quality]);

  async function shareConfiguration() {
    if (!shareUrl) return;
    await navigator.clipboard?.writeText(shareUrl);
  }

  return (
    <aside className="luxury-panel w-full rounded-[2rem] p-5 text-stone-900 lg:max-w-xs">
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-stone-500">Color lab</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Cor, brilho e FPS</h2>

      <label className="mt-6 block text-sm font-medium text-stone-600" htmlFor="hair-color">Cor do cabelo</label>
      <div className="mt-3 flex items-center gap-3">
        <input
          aria-label="Selecionar cor do cabelo"
          className="h-12 w-16 cursor-pointer rounded-2xl border border-white bg-transparent p-1"
          id="hair-color"
          onChange={(event) => setControl("color", event.target.value)}
          type="color"
          value={controls.color}
        />
        <div className="grid flex-1 grid-cols-7 gap-2">
          {swatches.map((swatch) => (
            <button
              aria-label={`Aplicar cor ${swatch}`}
              className="h-9 rounded-full border border-white/80 shadow-inner transition hover:scale-105"
              key={swatch}
              onClick={() => setControl("color", swatch)}
              style={{ backgroundColor: swatch }}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <RangeControl label="Brilho anisotrópico" max={1} min={0} onChange={(value) => setControl("shine", value)} step={0.01} value={controls.shine} />
        <RangeControl label="Comprimento" max={1.2} min={0.35} onChange={(value) => setControl("length", value)} step={0.01} value={controls.length} />
        <RangeControl label="Intensidade reflexo" max={1} min={0} onChange={(value) => setControl("reflection", value)} step={0.01} value={controls.reflection} />
        <RangeControl label="Volume" max={1.25} min={0.42} onChange={(value) => setControl("volume", value)} step={0.01} value={controls.volume} />
        <RangeControl label="Intensidade softbox" max={1.8} min={0.35} onChange={setLightIntensity} step={0.01} value={lightIntensity} />
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2">
        {qualities.map((item) => (
          <button
            className={`rounded-xl px-2 py-2 text-xs font-bold uppercase transition ${quality === item ? "bg-stone-950 text-white" : "bg-white/70 text-stone-600 hover:bg-white"}`}
            key={item}
            onClick={() => setQuality(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <button className="rounded-2xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800" onClick={toggleBeforeMode} type="button">
          {beforeMode ? "Ver depois" : "Antes/depois"}
        </button>
        <button className="rounded-2xl border border-stone-300 bg-white/65 px-4 py-3 text-sm font-semibold text-stone-800 transition hover:bg-white" onClick={toggleAutoRotate} type="button">
          {autoRotate ? "Pausar 360°" : "Auto 360°"}
        </button>
        <button className="rounded-2xl border border-stone-300 bg-white/65 px-4 py-3 text-sm font-semibold text-stone-800 transition hover:bg-white" onClick={saveCurrentLook} type="button">
          Salvar look
        </button>
        <button className="rounded-2xl border border-stone-300 bg-white/65 px-4 py-3 text-sm font-semibold text-stone-800 transition hover:bg-white" onClick={shareConfiguration} type="button">
          Compartilhar
        </button>
      </div>

      {savedLooks.length > 0 && (
        <div className="mt-5 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">Favoritos salvos</p>
          {savedLooks.map((look) => (
            <button className="w-full rounded-xl bg-white/65 px-3 py-2 text-left text-sm text-stone-700" key={look.id} onClick={() => applyLook(look)} type="button">
              {look.label}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
});

type RangeControlProps = {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
};

const RangeControl = memo(function RangeControl({ label, max, min, onChange, step, value }: RangeControlProps) {
  return (
    <label className="block text-sm font-medium text-stone-600">
      <span className="flex justify-between">
        {label}
        <span className="font-mono text-xs text-stone-400">{Math.round(value * 100)}%</span>
      </span>
      <input className="mt-3 w-full accent-stone-950" max={max} min={min} onChange={(event) => onChange(Number(event.target.value))} step={step} type="range" value={value} />
    </label>
  );
});
