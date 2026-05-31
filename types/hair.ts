export type GraphicsQuality = "ultra" | "high" | "medium" | "low";

export type HairStyleId =
  | "long-straight"
  | "curly"
  | "wavy"
  | "bob"
  | "ponytail"
  | "layered"
  | "wolf"
  | "butterfly";

export type HairTexture = "straight" | "curly" | "wavy" | "updo" | "layered";

export type HairAssetVariant = {
  quality: GraphicsQuality;
  url: string;
  textureSet?: {
    baseColor?: string;
    normal?: string;
    roughness?: string;
    ao?: string;
    anisotropy?: string;
  };
};

export type HairStyle = {
  id: HairStyleId;
  name: string;
  description: string;
  length: number;
  texture: HairTexture;
  volume: number;
  variants: HairAssetVariant[];
};

export type HairControls = {
  color: string;
  shine: number;
  length: number;
  reflection: number;
  volume: number;
};

export type PerformanceSnapshot = {
  fps: number;
  memoryMb: number | null;
  quality: GraphicsQuality;
  gpuTier: string;
};
