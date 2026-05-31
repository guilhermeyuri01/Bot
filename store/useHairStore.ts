import { create } from "zustand";

export type HairStyleId = "long-straight" | "curly" | "wavy" | "bob" | "ponytail";

export type HairTexture = "liso" | "cacheado" | "ondulado";

export type HairStyle = {
  id: HairStyleId;
  name: string;
  description: string;
  length: number;
  texture: HairTexture;
  assetPath: string;
};

type HairState = {
  selectedStyle: HairStyleId;
  color: string;
  shine: number;
  lightIntensity: number;
  autoRotate: boolean;
  beforeMode: boolean;
  styles: HairStyle[];
  setStyle: (style: HairStyleId) => void;
  setColor: (color: string) => void;
  setShine: (shine: number) => void;
  setLightIntensity: (lightIntensity: number) => void;
  toggleAutoRotate: () => void;
  toggleBeforeMode: () => void;
};

export const hairStyles: HairStyle[] = [
  {
    id: "long-straight",
    name: "Long straight",
    description: "Fios longos, lisos e luminosos para um acabamento editorial.",
    length: 1,
    texture: "liso",
    assetPath: "/models/hair1.glb",
  },
  {
    id: "curly",
    name: "Curly",
    description: "Volume cacheado com silhueta glamourosa e movimento suave.",
    length: 0.78,
    texture: "cacheado",
    assetPath: "/models/hair2.glb",
  },
  {
    id: "wavy",
    name: "Wavy",
    description: "Ondas soltas tipo campanha de shampoo, com reflexos macios.",
    length: 0.88,
    texture: "ondulado",
    assetPath: "/models/hair3.glb",
  },
  {
    id: "bob",
    name: "Bob cut",
    description: "Corte curto sofisticado, limpo e premium.",
    length: 0.42,
    texture: "liso",
    assetPath: "/models/hair4.glb",
  },
  {
    id: "ponytail",
    name: "Ponytail",
    description: "Rabo de cavalo alto com acabamento polido de salão.",
    length: 0.82,
    texture: "liso",
    assetPath: "/models/hair5.glb",
  },
];

export const useHairStore = create<HairState>((set) => ({
  selectedStyle: "long-straight",
  color: "#3b241c",
  shine: 0.72,
  lightIntensity: 1.15,
  autoRotate: true,
  beforeMode: false,
  styles: hairStyles,
  setStyle: (selectedStyle) => set({ selectedStyle, beforeMode: false }),
  setColor: (color) => set({ color, beforeMode: false }),
  setShine: (shine) => set({ shine }),
  setLightIntensity: (lightIntensity) => set({ lightIntensity }),
  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),
  toggleBeforeMode: () => set((state) => ({ beforeMode: !state.beforeMode })),
}));
