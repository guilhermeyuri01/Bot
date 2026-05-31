import { create } from "zustand";
import { detectInitialQuality } from "@/lib/quality";
import type { GraphicsQuality, HairControls, HairStyle, HairStyleId, PerformanceSnapshot } from "@/types/hair";

export type { GraphicsQuality, HairStyle, HairStyleId } from "@/types/hair";

type SavedLook = {
  id: string;
  label: string;
  style: HairStyleId;
  controls: HairControls;
};

type HairState = {
  selectedStyle: HairStyleId;
  controls: HairControls;
  lightIntensity: number;
  autoRotate: boolean;
  beforeMode: boolean;
  quality: GraphicsQuality;
  performance: PerformanceSnapshot;
  favoriteIds: HairStyleId[];
  savedLooks: SavedLook[];
  styles: HairStyle[];
  setStyle: (style: HairStyleId) => void;
  setControl: <K extends keyof HairControls>(key: K, value: HairControls[K]) => void;
  setLightIntensity: (lightIntensity: number) => void;
  setQuality: (quality: GraphicsQuality) => void;
  setPerformance: (snapshot: Partial<PerformanceSnapshot>) => void;
  toggleAutoRotate: () => void;
  toggleBeforeMode: () => void;
  toggleFavorite: (style: HairStyleId) => void;
  saveCurrentLook: () => void;
  applyLook: (look: SavedLook) => void;
};

export const hairStyles: HairStyle[] = [
  {
    id: "long-straight",
    name: "Long Straight",
    description: "Fios longos, lisos e luminosos para acabamento editorial premium.",
    length: 1,
    texture: "straight",
    volume: 0.52,
    variants: qualityVariants("long-straight"),
  },
  {
    id: "curly",
    name: "Curly",
    description: "Cachos volumosos com silhueta glamourosa e reflexos definidos.",
    length: 0.78,
    texture: "curly",
    volume: 0.92,
    variants: qualityVariants("curly"),
  },
  {
    id: "wavy",
    name: "Wavy",
    description: "Ondas soltas de campanha de shampoo, com movimento suave.",
    length: 0.88,
    texture: "wavy",
    volume: 0.68,
    variants: qualityVariants("wavy"),
  },
  {
    id: "bob",
    name: "Bob Cut",
    description: "Corte curto sofisticado, limpo e pronto para visagismo de salão.",
    length: 0.42,
    texture: "straight",
    volume: 0.48,
    variants: qualityVariants("bob"),
  },
  {
    id: "ponytail",
    name: "Ponytail",
    description: "Rabo de cavalo alto com acabamento polido e reflexo de estúdio.",
    length: 0.82,
    texture: "updo",
    volume: 0.58,
    variants: qualityVariants("ponytail"),
  },
  {
    id: "layered",
    name: "Layered Cut",
    description: "Camadas longas, leves e comerciais para rosto feminino realista.",
    length: 0.9,
    texture: "layered",
    volume: 0.7,
    variants: qualityVariants("layered"),
  },
  {
    id: "wolf",
    name: "Wolf Cut",
    description: "Textura moderna com franja, volume no topo e camadas marcantes.",
    length: 0.72,
    texture: "layered",
    volume: 0.82,
    variants: qualityVariants("wolf"),
  },
  {
    id: "butterfly",
    name: "Butterfly Cut",
    description: "Camadas abertas e luxuosas para moldar o rosto com glamour.",
    length: 0.96,
    texture: "wavy",
    volume: 0.76,
    variants: qualityVariants("butterfly"),
  },
];

const initialControls: HairControls = {
  color: "#3b241c",
  shine: 0.72,
  length: 1,
  reflection: 0.68,
  volume: 0.62,
};

export const useHairStore = create<HairState>((set, get) => ({
  selectedStyle: "long-straight",
  controls: initialControls,
  lightIntensity: 1.15,
  autoRotate: true,
  beforeMode: false,
  quality: "high",
  performance: { fps: 60, memoryMb: null, quality: "high", gpuTier: "detectando" },
  favoriteIds: [],
  savedLooks: [],
  styles: hairStyles,
  setStyle: (selectedStyle) => {
    const style = get().styles.find((item) => item.id === selectedStyle);
    set((state) => ({
      selectedStyle,
      beforeMode: false,
      controls: style ? { ...state.controls, length: style.length, volume: style.volume } : state.controls,
    }));
  },
  setControl: (key, value) => set((state) => ({ controls: { ...state.controls, [key]: value }, beforeMode: false })),
  setLightIntensity: (lightIntensity) => set({ lightIntensity }),
  setQuality: (quality) => set((state) => ({ quality, performance: { ...state.performance, quality } })),
  setPerformance: (snapshot) => set((state) => ({ performance: { ...state.performance, ...snapshot } })),
  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),
  toggleBeforeMode: () => set((state) => ({ beforeMode: !state.beforeMode })),
  toggleFavorite: (style) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(style)
        ? state.favoriteIds.filter((item) => item !== style)
        : [...state.favoriteIds, style],
    })),
  saveCurrentLook: () =>
    set((state) => ({
      savedLooks: [
        {
          id: crypto.randomUUID?.() ?? `${Date.now()}`,
          label: `${state.styles.find((style) => style.id === state.selectedStyle)?.name ?? "Look"} premium`,
          style: state.selectedStyle,
          controls: state.controls,
        },
        ...state.savedLooks.slice(0, 5),
      ],
    })),
  applyLook: (look) => set({ selectedStyle: look.style, controls: look.controls, beforeMode: false }),
}));

export function bootstrapQuality() {
  useHairStore.getState().setQuality(detectInitialQuality());
}

function qualityVariants(id: HairStyleId) {
  return (["ultra", "high", "medium", "low"] as const).map((quality) => ({
    quality,
    url: `/models/hair/${id}.${quality}.glb`,
    textureSet: {
      baseColor: `/textures/hair/${id}-base.${quality}.ktx2`,
      normal: `/textures/hair/${id}-normal.${quality}.ktx2`,
      roughness: `/textures/hair/${id}-roughness.${quality}.ktx2`,
      ao: `/textures/hair/${id}-ao.${quality}.ktx2`,
      anisotropy: `/textures/hair/${id}-anisotropy.${quality}.ktx2`,
    },
  }));
}
