"use client";

import { useHairStore } from "@/store/useHairStore";

const swatches = ["#2b1712", "#5a3328", "#8a5639", "#c28a54", "#d8c4a5", "#5a1d22", "#111111"];

export function ColorPicker() {
  const {
    autoRotate,
    beforeMode,
    color,
    lightIntensity,
    setColor,
    setLightIntensity,
    setShine,
    shine,
    toggleAutoRotate,
    toggleBeforeMode,
  } = useHairStore();

  return (
    <aside className="luxury-panel w-full rounded-[2rem] p-5 text-stone-900 lg:max-w-xs">
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-stone-500">Color lab</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Cor e brilho</h2>

      <label className="mt-6 block text-sm font-medium text-stone-600" htmlFor="hair-color">
        Cor do cabelo
      </label>
      <div className="mt-3 flex items-center gap-3">
        <input
          aria-label="Selecionar cor do cabelo"
          className="h-12 w-16 cursor-pointer rounded-2xl border border-white bg-transparent p-1"
          id="hair-color"
          onChange={(event) => setColor(event.target.value)}
          type="color"
          value={color}
        />
        <div className="grid flex-1 grid-cols-7 gap-2">
          {swatches.map((swatch) => (
            <button
              aria-label={`Aplicar cor ${swatch}`}
              className="h-9 rounded-full border border-white/80 shadow-inner transition hover:scale-105"
              key={swatch}
              onClick={() => setColor(swatch)}
              style={{ backgroundColor: swatch }}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <RangeControl label="Brilho dos fios" max={1} min={0} onChange={setShine} step={0.01} value={shine} />
        <RangeControl
          label="Intensidade softbox"
          max={1.8}
          min={0.35}
          onChange={setLightIntensity}
          step={0.01}
          value={lightIntensity}
        />
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <button
          className="rounded-2xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
          onClick={toggleBeforeMode}
          type="button"
        >
          {beforeMode ? "Ver depois" : "Antes/depois"}
        </button>
        <button
          className="rounded-2xl border border-stone-300 bg-white/65 px-4 py-3 text-sm font-semibold text-stone-800 transition hover:bg-white"
          onClick={toggleAutoRotate}
          type="button"
        >
          {autoRotate ? "Pausar 360°" : "Auto 360°"}
        </button>
      </div>
    </aside>
  );
}

type RangeControlProps = {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
};

function RangeControl({ label, max, min, onChange, step, value }: RangeControlProps) {
  return (
    <label className="block text-sm font-medium text-stone-600">
      <span className="flex justify-between">
        {label}
        <span className="font-mono text-xs text-stone-400">{Math.round(value * 100)}%</span>
      </span>
      <input
        className="mt-3 w-full accent-stone-950"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}
